import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// components
import Tabs from './navigator/Tabs';
import { ProfileForm } from './components/Profile';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' hidden={true} />
      <ProfileForm />
    </NavigationContainer>
  );
}
