import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import realm from '../RealmInstance';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const Dashboard = () => {
  const [headlines, setHeadlines] = useState([]);
  const [headlineCount, setHeadlineCount] = useState(0);
  const [pinnedHeadlines, setPinnedHeadlines] = useState([]);
  const [articles, setArticles] = useState([]);
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [fetchingNextArticles, setFetchingNextArticles] = useState(false);
  const swipeableRefs = useRef(new Map());
  const intervalRef = useRef(null);

  const fetchArticles = async () => {
    try {
      const today = new Date();
      const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      const year = oneMonthAgo.getFullYear();
      const month = String(oneMonthAgo.getMonth() + 1).padStart(2, '0');
      const day = String(oneMonthAgo.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          country: 'us',
          category: 'business',
          sortBy: 'publishedAt',
          apiKey: '90e6eebe073447cda845c7484a508822',
          pageSize: 30,
        },
      });

      const fetchedArticles = response.data.articles;
      realm.write(() => {
        realm.deleteAll(); 
        fetchedArticles.forEach(article => {
          if (!realm.objectForPrimaryKey('Headline', article.url)) {
            realm.create('Headline', {
              id: article.url,
              title: article.title,
            });
          }
        });
      });

      setArticles(fetchedArticles);
      setHeadlines(fetchedArticles.slice(0, 1));
      setHeadlineCount(1);
      setIndex(1);

    } catch (error) {
      console.error('Error fetching headlines:', error);
    }
  };

  const fetchNextHeadline = useCallback(() => {
    if (index < articles.length) {
      const newHeadline = articles[index];
      setHeadlines(prevHeadlines => [newHeadline, ...prevHeadlines]);
      setIndex(prevIndex => prevIndex + 1);
      setHeadlineCount(prevCount => prevCount + 1);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [index, articles]);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    if (articles.length > 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(fetchNextHeadline, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [articles, fetchNextHeadline]);

  useEffect(() => {
  
    if (fetchingNextArticles && headlines.length === articles.length + pinnedHeadlines.length) {
      realm.write(() => {
        realm.deleteAll(); 
      });
      setFetchingNextArticles(false);
      fetchArticles(); 
    }
  }, [fetchingNextArticles, headlines, articles, pinnedHeadlines]);

  const handleRefresh = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    fetchNextHeadline();
    intervalRef.current = setInterval(fetchNextHeadline, 5000);
  };

  const deleteHeadline = (url) => {
    setHeadlines((prevHeadlines) => {
      const updatedHeadlines = prevHeadlines.filter((headline) => headline.url !== url);
      setHeadlineCount(updatedHeadlines.length);
      return updatedHeadlines;
    });
    swipeableRefs.current.get(url)?.close();
  };

  const pinHeadline = (url) => {
    setHeadlines((prevHeadlines) => {
      const headlineToPin = prevHeadlines.find((headline) => headline.url === url);
      if (headlineToPin) {
        setPinnedHeadlines((prevPinned) => [headlineToPin, ...prevPinned]);
      }
      return prevHeadlines.filter((headline) => headline.url !== url);
    });
    swipeableRefs.current.get(url)?.close();
  };

  const unpinHeadline = (url) => {
    setPinnedHeadlines((prevPinned) => {
      const headlineToUnpin = prevPinned.find((headline) => headline.url === url);
      if (headlineToUnpin) {
        setHeadlines((prevHeadlines) => [headlineToUnpin, ...prevHeadlines]);
      }
      return prevPinned.filter((headline) => headline.url !== url);
    });
    swipeableRefs.current.get(url)?.close();
  };

  const renderRightActions = (url, isPinned) => (
    <View style={styles.actionButtons}>
      <TouchableOpacity onPress={() => (isPinned ? unpinHeadline(url) : pinHeadline(url))} style={styles.pinButton}>
        <Icon name="thumb-tack" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteHeadline(url)} style={styles.deleteButton}>
        <Icon name="trash" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const renderHeadline = ({ item }) => {
    const isPinned = pinnedHeadlines.some(headline => headline.url === item.url);
    return (
      <Swipeable
        ref={(ref) => {
          if (ref && !swipeableRefs.current.get(item.url)) {
            swipeableRefs.current.set(item.url, ref);
          }
        }}
        renderRightActions={() => renderRightActions(item.url, isPinned)}
      >
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          {isPinned && <Icon name="thumb-tack" size={16} color="#FFBF00" />}
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.heading}>Latest News</Text>
        <TouchableOpacity
          style={[styles.refreshButton, isHovered && styles.refreshButtonHover]}
          onPress={handleRefresh}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.headingCount}>
        Showing {headlineCount} of {articles.length} Headlines
      </Text>
      <FlatList
        data={[...pinnedHeadlines, ...headlines]}
        renderItem={renderHeadline}
        keyExtractor={item => item.url}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#020a17',
    color: '#FFFFFF',
  },
  topSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 30,
    paddingBottom: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 45,
    textAlign: 'left',
  },
  headingCount: {
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'left',
    fontWeight: '400',
    color: '#fff',
  },
  item: {
    backgroundColor: '#111828',
    color: '#fff',
    padding: 15,
    marginVertical: 2,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'left',
    fontWeight: '400',
    color: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pinButton: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    paddingVertical: 24,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    paddingVertical: 24,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  refreshButton: {
    cursor:'pointer',
    backgroundColor: '#020a17',
    padding: 10,
    borderRadius: 5,
  },
  refreshButtonHover: {
    backgroundColor: 'blue',  
  },
  refreshButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Dashboard;