/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { View } from 'react-native';
import SplashScreen from './src/pages/SpalashScreen'; 
import Dashboard from './src/pages/Dashboard/Dashboard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const App = () => {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 5000); 
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {showSplash ? <SplashScreen /> : <Dashboard />}
    </GestureHandlerRootView>
  );
};

export default App;
