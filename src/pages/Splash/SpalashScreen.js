import React, {useState, useEffect} from 'react';
import {View, Image, Text} from 'react-native';
import {splashStyles as styles} from './SplashStyles';

const images = {
  image1: require('../../../public/splashImage.jpeg'),
};

const SplashScreen = () => {
  const heading = [
    'Latest News Updates',
    'Pin the news for later',
    'Cut the Noise from News',
    'Get refreshed with News',
    'Get News in sorts',
  ];
  const subHeading = [
    'Stay Updated with latest news on the go ',
    'Interested in a news ? Just Pin it and access it later',
    'Discard unwanted news that you don’t like ',
    'Our app keeps fetching latest news in every 5 Secs so you can stay updated',
    'Checkout news in sorts that is easy to read in less than 60 seconds !',
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(prevIndex => (prevIndex + 1) % heading.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={images['image1']} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{heading[currentTextIndex]}</Text>
        <Text style={styles.subHeadingText}>
          {subHeading[currentTextIndex]}
        </Text>
      </View>
      <View style={styles.dotContainer}>
        {heading.map((item, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentTextIndex === index ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default SplashScreen;
