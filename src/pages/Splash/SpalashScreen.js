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
        source={require('../../../Lottie/newsLottie.json')}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff',
  },
});

export default SplashScreen;
