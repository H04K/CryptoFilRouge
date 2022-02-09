import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// components
import Tabs from './navigator/Tabs';

export default function App() {
  return (
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
  );
}
