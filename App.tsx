import { StatusBar, StyleSheet, useColorScheme, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import RootNavigator from './src/Navigations/RootNavigator';
import { requestLocationPermission } from './src/Utils/PermissionManager';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const requestPermissionOnStart = async () => {
      const granted = await requestLocationPermission();
      if (!granted) {
        Alert.alert(
          'Location Permission Required',
          'This app requires location permission to show maps and provide location-based features.',
          [{ text: 'OK' }]
        );
      }
    };


    requestPermissionOnStart();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
