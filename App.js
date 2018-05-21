

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'; 

import LoginPage from './Components/LoginComps/LoginPage';
import FeedPage from './Components/FeedComps/FeedPage';

import { createStackNavigator } from 'react-navigation';


const RootStack = createStackNavigator({
	//Routs
  	Login: { screen: LoginPage},
  	Feed: { screen: FeedPage},
  },{ //options
	initialRouteName: 'Login',
});

type Props = {} ;
export default class App extends React.Component{
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
	
});
