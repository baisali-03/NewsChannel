
import React from 'react';
import SplashScreen from './src/pages/Splash/SpalashScreen';
import Dashboard from './src/pages/Dashboard/Dashboard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://f62abd781d36172916f0c117a3018db9@o1153809.ingest.us.sentry.io/4507371852267520',
});

const App: React.FC = () => {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 10000);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {showSplash? <SplashScreen /> : <Dashboard />}
    </GestureHandlerRootView>
  );
};

export default App;