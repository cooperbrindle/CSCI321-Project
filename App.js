

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'; 

import LoginPage from './Components/LoginComps/LoginPage';
/*import HomePage from './Components/HomeComps/HomePage';

import { createStackNavigator } from 'react-navigation';


const RootStack = createStackNavigator({
	//Routs
  	Login: { screen: LoginPage},
  	Home: { screen: HomePage},
  },{ //options
  initialRouteName: 'Login',
  headerStyle: {backgroundColor: '#0C2340'},
  headerTitleStyle: {color: 'white'},
});*/

type Props = {} ;
export default class App extends React.Component{
  render() {
    return <LoginPage />;
  }
}

const styles = StyleSheet.create({
	
});
