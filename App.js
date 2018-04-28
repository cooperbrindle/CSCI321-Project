

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'; 
import { StackNavigator } from 'react-navigation';


const navStack = StackNavigator({
	//Routs
  	Login: { screen: LoginPage,
			path: 'Components/LoginComps/LoginPage', },
  	Feed: { screen: FeedPage,
			path: 'Components/FeedComps/FeedPage', },
	
  },{ //options
	initialRouteName: 'Login',
});

type Props = {} ;
export default class App extends Component<Props> {
  render() {
	return (
		< navStack />
	);
  }
}

const styles = StyleSheet.create({
	
});
