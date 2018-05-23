

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'; 

import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import EventSingle from './Components/EventSingle';
import HomePage2 from './Components/HomePage2';

import { createStackNavigator, createSwitchNavigator } from 'react-navigation';


const NavStack = createStackNavigator({
  //Routs
    Home: { screen: HomePage},
    EventSingle: { screen: EventSingle},
    Home2: { screen: HomePage2},
  },{ //options
  initialRouteName: 'Home',
});

const RootStack = createSwitchNavigator({
  //Routs
	Login: { screen: LoginPage},
    Home: { screen: NavStack},
  },{ //options
  initialRouteName: 'Login',
});

export default class App extends React.Component{
  render() {
	return <RootStack />;
  }
}

const styles = StyleSheet.create({
	
});

/**/
