

import React, { Component } from 'react';

import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import EventSingle from './Components/Events/EventSingle';
import BenefitsMenu from './Components/Promotions/Benefits';
import UpdateDetailsMenu from './Components/UpdateDetails/UpdateDetailsMenu';
import AccountForm from './Components/UpdateDetails/AccountForm';
import ContactForm from './Components/UpdateDetails/ContactForm';
import EmploymentForm from './Components/UpdateDetails/EmploymentForm';
import SubscriptionForm from './Components/UpdateDetails/SubscriptionForm';
import SignUpForm from './Components/SignUp/SignUpForm';
import SignUpFinish from './Components/SignUp/SignUpFinish';
import OutlookWebPage from './Components/Outlook/OutlookWeb';
import LibraryMembership from './Components/Promotions/LibraryMembership';
import Discounts from './Components/Promotions/Discounts';
import Scholarships from './Components/Promotions/Scholarships';
import Careers from './Components/Promotions/Careers';
import CareerHub from './Components/Promotions/CareerHub';
import EventsList from './Components/Events/EventsList';
import Volunteering from './Components/Promotions/Volunteering';
import DiscountCard from './Components/Promotions/DiscountCard';

import Vultrsdk from './Components/Vultrsdk';

import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';

const settingsNav = createDrawerNavigator({
	//Routes
	Password: {screen: HomePage},
	FAQ: {screen: HomePage},
});

const navStack = createStackNavigator({
	//Routes
	Home: { screen: HomePage},
	OutlookMag: { screen: OutlookWebPage },
	UDMenu: { screen: UpdateDetailsMenu },
	AccForm: { screen: AccountForm },
	ContForm: { screen: ContactForm },
	EmpForm: { screen: EmploymentForm },
	SubForm: { screen: SubscriptionForm },
	EventSingle: { screen: EventSingle },
    EventsList: {screen: EventsList },
    Benefits: { screen: BenefitsMenu },
    LibraryMem: { screen: LibraryMembership },
    Discounts: { screen: Discounts },
    Scholarships: { screen: Scholarships },
    Careers: { screen: Careers },
	CareerHub: { screen: CareerHub },
	settings: { screen: settingsNav },
	Volunteering: { screen: Volunteering },
	DiscountCard: { screen: DiscountCard },
},{ //options
  	initialRouteName: 'Home',
});



const RootStack = createSwitchNavigator({
  	//Routs
	Login: { screen: LoginPage},
	Home: { screen: navStack },
	SUForm: { screen: SignUpForm},
	SUFinish: { screen: SignUpFinish},
  },{ //options
  initialRouteName: 'Login',
});

export default class App extends React.Component{

  componentWillMount(){
    
  }

  render() {
    vultr = new Vultrsdk();
	  return <RootStack screenProps={vultr}/>;
  }
}

