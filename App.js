

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'; 
import { StackNavigator } from 'react-navigation';

import LoginPage from './Components/LoginComps/LoginPage';
import FeedPage from './Components/FeedComps/FeedPage';


/*const navStack = StackNavigator({
	//Routs
  	Login: { screen: LoginPage},
  	Feed: { screen: FeedPage},
  },{ //options
	initialRouteName: 'Login',
});
*/
type Props = {} ;
export default class App extends Component<Props> {
  render() {
	return (
    //< navStack />
    < LoginPage />
	);
  }
}

const styles = StyleSheet.create({
	
});
