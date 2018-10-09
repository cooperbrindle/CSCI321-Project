

import React, { Component } from 'react';

import LoginPage from './Components/LoginPage';
import Logout from './Components/Logout';
import HomePage from './Components/HomePage';
import SignUpForm from './Components/SignUp/SignUpForm';
import SignUpFinish from './Components/SignUp/SignUpFinish';
import EventsList from './Components/Events/EventsList';
import EventSingle from './Components/Events/EventSingle';
import EventRego from './Components/Events/EventRego';
import OutlookWebPage from './Components/Outlook/OutlookWeb';
import UpdateDetailsMenu from './Components/UpdateDetails/UpdateDetailsMenu';
import AccountForm from './Components/UpdateDetails/AccountForm';
import ContactForm from './Components/UpdateDetails/ContactForm';
import PasswordForm from './Components/UpdateDetails/PasswordForm';
import EmploymentForm from './Components/UpdateDetails/EmploymentForm';
import SubscriptionForm from './Components/UpdateDetails/SubscriptionForm';
import BenefitsMenu from './Components/Promotions/Benefits';
import LibraryMembership from './Components/Promotions/LibraryMembership';
import Discounts from './Components/Promotions/Discounts';
import Scholarships from './Components/Promotions/Scholarships';
import Careers from './Components/Promotions/Careers';
import CareerHub from './Components/Promotions/CareerHub';
import FurtherStudy from './Components/Promotions/FurtherStudy';
import Volunteering from './Components/Promotions/Volunteering';
import Mentoring from './Components/Promotions/Mentoring';
import Networking from './Components/Promotions/Networking';
import DiscountCard from './Components/Promotions/DiscountCard';

import Vultrsdk from './Components/Vultrsdk';

import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';



const navStack = createStackNavigator({
	//Routes
	HomePage: { screen: HomePage},
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
	Volunteering: { screen: Volunteering },
	DiscountCard: { screen: DiscountCard },
	FurtherStudy: { screen: FurtherStudy },
	Mentoring: { screen: Mentoring },
	Networking: { screen: Networking },
	EventRego: { screen: EventRego },
},{ //options
	initialRouteName: 'HomePage',
});

const drawerNav = createDrawerNavigator({
	//Routes
	Home: { screen: navStack },
	Password: { screen: PasswordForm },
	FAQ: { screen: navStack },
	Logout: { screen: Logout },
},{ //options
	initialRouteName: 'Home',
	drawerPosition: 'right',
	contentOptions: {
		activeBackgroundColor: '#0C2340',
		activeTintColor: 'white',
		inactiveTintColor: '#0C2340'
	}
});


const RootStack = createSwitchNavigator({
  	//Routs
	Login: { screen: LoginPage},
	HomeDrawer: { screen: drawerNav },
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

