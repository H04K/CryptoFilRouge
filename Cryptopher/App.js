import React, { Component } from 'react';
import { StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// components
import Tabs from './navigator/Tabs';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' hidden={true} />
      <Tabs />
    </NavigationContainer>
  );
}
