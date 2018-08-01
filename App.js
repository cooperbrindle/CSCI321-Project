

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
import UpdateDetailsMenu from './Components/UpdateDetailsMenu';
import AccountForm from './Components/AccountForm';
import ContactForm from './Components/ContactForm';
import EmploymentForm from './Components/EmploymentForm';
import SubscriptionForm from './Components/SubscriptionForm';
import SignUpForm from './Components/SignUpForm';
import SignUpFinish from './Components/SignUpFinish';

import firebase from 'firebase';
//import firebaseConfig from './Components/Database/DatabaseConfig';

import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

const firebaseConfig = {
  apiKey: 'AIzaSyAN7jnv-YL5RWJ3uoeO-mpFV2W_kJKYWuU',
  authDomain: 'alumnitest-1.firebaseapp.com',
  projectId: 'alumnitest-1'
};

const NavStack = createStackNavigator({
  //Routes
    Home: { screen: HomePage},
    EventSingle: { screen: EventSingle},
    Home2: { screen: HomePage2},
    UDMenu: { screen: UpdateDetailsMenu},
    AccForm: { screen: AccountForm},
    ContForm: { screen: ContactForm},
    EmpForm: { screen: EmploymentForm},
    SubForm: { screen: SubscriptionForm},
  },{ //options
  initialRouteName: 'Home',
});

const RootStack = createSwitchNavigator({
  //Routs
	Login: { screen: LoginPage},
  Home: { screen: NavStack},
  SUForm: { screen: SignUpForm},
  SUFinish: { screen: SignUpFinish},
  },{ //options
  initialRouteName: 'Home',
});

export default class App extends React.Component{

  componentWillMount(){
    try{
    firebase.initializeApp(firebaseConfig);
    }catch(err){console.warn('App.js Firebase: ' + err.message);}
  }

  render() {
	  return <RootStack screenProps={firebase}/>;
  }
}

