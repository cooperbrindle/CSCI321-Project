

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'; 

import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import EventSingle from './Components/Events/EventSingle';
import Promotions from './Components/Promotions/Promotions';
import UpdateDetailsMenu from './Components/UpdateDetails/UpdateDetailsMenu';
import AccountForm from './Components/UpdateDetails/AccountForm';
import ContactForm from './Components/UpdateDetails/ContactForm';
import EmploymentForm from './Components/UpdateDetails/EmploymentForm';
import SubscriptionForm from './Components/UpdateDetails/SubscriptionForm';
import SignUpForm from './Components/SignUpForm';
import SignUpFinish from './Components/SignUpFinish';
import OutlookWebPage from './Components/Outlook/OutlookWeb';
import LibraryMembership from './Components/Promotions/LibraryMembership';
import Discounts from './Components/Promotions/Discounts';
import Scholarships from './Components/Promotions/Scholarships';
import Careers from './Components/Promotions/Careers';
import CareerHub from './Components/Promotions/CareerHub';
import EventsList from './Components/Events/EventsList.js'

//import firebase from 'firebase';
//import firebaseConfig from './Components/Database/DatabaseConfig';
import Vultrsdk from './Components/Vultrsdk';

import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

const NavStack = createStackNavigator({
  //Routes
    Home: { screen: HomePage},
    EventSingle: { screen: EventSingle},
    Promotion: { screen: Promotions},
    UDMenu: { screen: UpdateDetailsMenu},
    AccForm: { screen: AccountForm},
    ContForm: { screen: ContactForm},
    EmpForm: { screen: EmploymentForm},
    SubForm: { screen: SubscriptionForm},
    OutlookWeb: { screen: OutlookWebPage},
    LibraryMem: { screen: LibraryMembership },
    Discounts: { screen: Discounts },
    Scholarships: {screen: Scholarships},
    Careers: {screen: Careers},
    CareerHub: {screen: CareerHub},
    EventsList: {screen: EventsList},

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
  initialRouteName: 'Login',
});

export default class App extends React.Component{

  componentWillMount(){
    /*try{
    firebase.initializeApp(firebaseConfig);
    }catch(err){console.warn('App.js Firebase: ' + err.message);}
    */
  }

  render() {
    vultr = new Vultrsdk();
	  return <RootStack screenProps={vultr}/>;
  }
}

