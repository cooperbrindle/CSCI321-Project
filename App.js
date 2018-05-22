

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'; 

import LoginPage from './Components/LoginComps/LoginPage';
import HomePage from './Components/HomeComps/HomePage';

import { createStackNavigator, createSwitchNavigator } from 'react-navigation';


const NavStack = createStackNavigator({
  //Routs
  	Home: { screen: HomePage},
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

type Props = {} ;
export default class App extends React.Component{
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
	
});
