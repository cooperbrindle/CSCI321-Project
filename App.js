/////////////////////////////////////////
// INITIAL APP START PAGE
//
// UOW Alumni mobile application
//
// 		Daniel McKinnell - 17/10/18
//		Cooper Brindle 	 - 17/10/18
/////////////////////////////////////////


/////////////////////////////////////////
// custom node packages references
//
// 	LinkedIn SignIn Modal: https://github.com/xcarpentier/react-native-linkedin
// 	Carousel: https://github.com/archriss/react-native-snap-carousel
// 	Keyboard Aware Scroll View: https://github.com/APSL/react-native-keyboard-aware-scroll-view
//
/////////////////////////////////////////

import React from 'react';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import Vultrsdk from './Components/Vultrsdk';

/////////////////////////////////////////////////////////////////////////////////////////
// Page Imports
import LoginPage from './Components/LoginPage';
import Logout from './Components/Drawer/Logout';
import ForgotPassword from './Components/ForgotPassword';
import FAQs from './Components/Drawer/faq';
import HomePage from './Components/HomePage';
import SignUpForm from './Components/SignUp/SignUpForm';
import Conditions from './Components/SignUp/Conditions';
import SignUpFinish from './Components/SignUp/SignUpFinish';
import EventsList from './Components/Events/EventsList';
import EventSingle from './Components/Events/EventSingle';
import EventRego from './Components/Events/EventRego';
import GuestRego from './Components/Events/GuestRego';
import UpdateDetailsMenu from './Components/UpdateDetails/UpdateDetailsMenu';
import AccountForm from './Components/UpdateDetails/AccountForm';
import ContactForm from './Components/UpdateDetails/ContactForm';
import PasswordForm from './Components/Drawer/PasswordForm';
import EmploymentForm from './Components/UpdateDetails/EmploymentForm';
import SubscriptionForm from './Components/UpdateDetails/SubscriptionForm';
import BenefitsMenu from './Components/Promotions/Benefits';
import LibraryMembership from './Components/Promotions/LibraryMembership';
import Discounts from './Components/Promotions/Discounts';
import Careers from './Components/Promotions/Careers';
import WebViewPage from './Components/WebView/WebViewPage';


/////////////////////////////////////////////////////////////////////////////////////////
// Navigation setup

//Main app navigation stack
const navStack = createStackNavigator({
	//Routes
	HomePage: { screen: HomePage},
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
    Careers: { screen: Careers },
	EventRego: { screen: EventRego },
	GuestRego: { screen: GuestRego },
	WebViewPage: { screen: WebViewPage },
	
},{ //options
	initialRouteName: 'HomePage',
});

// user so pages have header bars
const passwordStack = createStackNavigator({
	Password: { screen: PasswordForm }
});
const faqStack = createStackNavigator({
	FAQs: { screen: FAQs }
});


// Tab drawer navigator
const drawerNav = createDrawerNavigator({
	//Routes
	Home: { screen: navStack },
	'Update Password': { screen: passwordStack },
	FAQs: { screen: faqStack },
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


// stack so all pages have header bar
const RootStack = createStackNavigator({
	//Routs
	Login: { screen: LoginPage},
	SUForm: { screen: SignUpForm},
	SUFinish: { screen: SignUpFinish},
	Conditions: { screen: Conditions },
	ForgotPassword: { screen: ForgotPassword },
},{ //options
  initialRouteName: 'Login',
});

//Switch navigator (ROOT NAVIGATOR)
const RootSwitch = createSwitchNavigator({
	//Routs
  LoginRoot: { screen: RootStack},
  HomeDrawer: { screen: drawerNav },
},{ //options
initialRouteName: 'LoginRoot',
});

export default class App extends React.Component{

	componentWillMount(){
		//INITIATE BACKEND SDK
		this.vultr = new Vultrsdk();
	}

	render() {
		return <RootSwitch screenProps={this.vultr}/>;
	}
}

