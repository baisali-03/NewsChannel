import React, {useEffect, useState, useRef, useCallback} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import realm from '../../RealmInstance';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import {dashboardStyles as styles} from './DashboardStyles';
import {NEWS_API_KEY} from '@env';

const Dashboard = () => {
  const [headlines, setHeadlines] = useState([]);
  const [headlineCount, setHeadlineCount] = useState(0);
  const [pinnedHeadlines, setPinnedHeadlines] = useState([]);
  const [articles, setArticles] = useState([]);
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const swipeableRefs = useRef(new Map());
  const intervalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch articles from API
  const fetchArticles = async () => {
    try {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: 'apple',
          sortBy: 'popularity',
          apiKey: NEWS_API_KEY,
          pageSize: 100,
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
      setHeadlines(fetchedArticles.slice(0, 10));
      setHeadlineCount(10);
      setIndex(10);
      setPinnedHeadlines([]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching headlines:', error);
    }
  };

  // Function to load initial data from realm
  const loadInitialData = () => {
    const existingArticles = realm.objects('Headline');

    if (existingArticles.length > 0) {
      const articlesFromRealm = existingArticles.map(article => ({
        title: article.title,
        url: article.id,
      }));
      setArticles(articlesFromRealm);
      setHeadlines(articlesFromRealm.slice(0, 1));
      setHeadlineCount(1);
      setIndex(1);
    }
    // Mark initial load as complete
    setInitialLoadComplete(true);
  };

  // Function to fetch next headline
  const fetchNextHeadline = useCallback(() => {
    if (index < articles.length) {
      const newHeadline = articles[index];
      setHeadlines(prevHeadlines => [newHeadline, ...prevHeadlines]);
      setIndex(prevIndex => prevIndex + 5);
      setHeadlineCount(prevCount => prevCount + 5);
    } else {
      // Fetch new articles if all headlines have been displayed
      fetchArticles();
    }
  }, [index, articles]);

  // Fetch articles after initial load completion
  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (initialLoadComplete) {
      fetchArticles();
    }
  }, [initialLoadComplete]);

  // Start interval to fetch next headline
  useEffect(() => {
    if (articles.length > 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(fetchNextHeadline, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [articles, fetchNextHeadline]);

  // Handle refresh button click
  const handleRefresh = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    fetchNextHeadline();
    intervalRef.current = setInterval(fetchNextHeadline, 5000);
  };

  // Function to delete a headline
  const deleteHeadline = url => {
    setHeadlines(prevHeadlines => {
      const updatedHeadlines = prevHeadlines.filter(
        headline => headline.url !== url,
      );
      setHeadlineCount(updatedHeadlines.length);
      return updatedHeadlines;
    });
    swipeableRefs.current.get(url)?.close();
  };

  // Function to pin a headline
  const pinHeadline = url => {
    setHeadlines(prevHeadlines => {
      const headlineToUpdate = prevHeadlines.find(
        headline => headline.url === url,
      );
      if (headlineToUpdate) {
        setPinnedHeadlines(prevPinned => [headlineToUpdate, ...prevPinned]);
        return prevHeadlines.filter(headline => headline.url !== url);
      }
      return prevHeadlines;
    });
    swipeableRefs.current.get(url)?.close();
  };

  // Function to render right actions for swipeable headlines
  const renderRightActions = (url, isPinned) => (
    <View style={styles.actionButtons}>
      <TouchableOpacity
        onPress={() => pinHeadline(url)}
        style={styles.pinButton}>
        <Icon name={'thumb-tack'} size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => deleteHeadline(url)}
        style={styles.deleteButton}>
        <Icon name="trash" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  // Function to render individual headline item
  const renderHeadline = ({item}) => {
    const isPinned = pinnedHeadlines.some(
      headline => headline.url === item.url,
    );
    return (
      <Swipeable
        ref={ref => {
          if (ref && !swipeableRefs.current.get(item.url)) {
            swipeableRefs.current.set(item.url, ref);
          }
        }}
        renderRightActions={() => renderRightActions(item.url, isPinned)}>
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          {isPinned && <Icon name="thumb-tack" size={16} color="#FFBF00" />}
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <Text style={{fontSize: 24, fontWeight: 700}}>Loading...</Text>
        </View>
      ) : (
        <>
          <View style={styles.topSection}>
            <Text style={styles.heading}>Latest News</Text>
            <TouchableOpacity
              style={[
                styles.refreshButton,
                isHovered && styles.refreshButtonHover,
              ]}
              onPress={handleRefresh}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              <Text style={styles.refreshButtonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.headingCount}>
            Showing {headlineCount} of {articles.length} Headlines
          </Text>
          <Text style={styles.backgroundText}>Made With Love By Baisali</Text>
          <FlatList
            style={styles.headingList}
            data={[...pinnedHeadlines, ...headlines]}
            renderItem={renderHeadline}
            keyExtractor={item => item.url}
            contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-start'}}
          />
        </>
      )}
    </View>
  );
};

export default Dashboard;
