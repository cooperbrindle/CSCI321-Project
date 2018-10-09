

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Platform, StatusBar, SafeAreaView, ScrollView} from 'react-native';

import { DashButton } from './CustomProps/DashButton';
import { Logo } from './CustomProps/Logo';

const updateDetailsIcon = require('./assets/UpdateDetails.png');
const outlookIcon = require('./assets/Outlook.png');
const eventsIcon = require('./assets/Events.png');
const promoIcon = require('./assets/Promotions.png');
const settingsIcon = require('./assets/Settings.png');

export default class HomePage extends Component {
	constructor(props){
		super(props);
		
	}

	static navigationOptions = ({navigation}) => {
		return {
		title: 'Home',
		headerStyle: {
			backgroundColor: '#0C2340',
			
		},
		headerTintColor: 'white',
		headerRight: (
			<TouchableHighlight 
				onPress={navigation.getParam('toggleSettings')}
			>
				<Image source={settingsIcon}
					style={{resizeMode: 'contain', width: 40, height: 40 }}
				/>
			</TouchableHighlight>	
		),
	}};//width: 40, height: 40

	toggleSettings = () => {
		this.props.navigation.toggleDrawer();;
	}

	componentDidMount(){
		this.props.navigation.setParams({toggleSettings: this.toggleSettings})
	 }

	render() {
		return (
			<View style={homeStyles.container}>
				<View style={homeStyles.logoCont}>
					<Logo scale={1} />
				</View>

				<View style={homeStyles.dashboard}>
					<DashButton title='Update Details' img={updateDetailsIcon} nav={()=>this.props.navigation.navigate('UDMenu')} />
					<DashButton title='Outlook' img={outlookIcon} nav={()=>this.props.navigation.navigate('OutlookMag')} />
				</View>

				<View style={homeStyles.dashboard}>
					<DashButton title='Events' img={eventsIcon} nav={()=>this.props.navigation.navigate('EventsList')} />
					<DashButton title='Benefits' img={promoIcon} nav={()=>this.props.navigation.navigate('Benefits')} />
				</View>
				
			</View>
		);
	}
};
	
	const homeStyles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#0C2340',
		},

		/////////////////////////////////////////LOGO
		logoCont: {
			flex: 1,
			marginBottom: 15,
		},
		settings: {
			//resizeMode: 'center'
		},
		
		/////////////////////////////////////////DASH BOARD
		dashboard: {
			flex: 1,
			flexDirection: 'row',
			marginLeft: 7,
			marginRight: 7,
			justifyContent: 'space-between',
		},
	});