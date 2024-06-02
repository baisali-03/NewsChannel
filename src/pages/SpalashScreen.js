import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Splash screen timer done, navigate to main app');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        style={{
          width: 200,
          height: 200,
        }}
        source={require('../../Lottie/newsLottie.json')}
        autoPlay
        loop
      />
      <Text style={styles.heading}>Welcome to the Latest News App </Text>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize:16,
    color:'#020a17',
    fontWeight:'700',
    paddingVertical: 10,
  }
});

export default SplashScreen;
