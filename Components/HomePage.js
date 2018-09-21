

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';

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
	renderHighlight(title, day, month){
		return(
			<TouchableHighlight style={styles.hlBtn}
				onPress={() => this.props.navigation.navigate('EventSingle')}>
				<View style={styles.hlBtnView}>
					<View style={styles.hlCont}>
						<Text style={styles.hlTitle}>
							{title}
						</Text>
					</View>
					<View style={styles.hlDate}>
						<Text style={styles.hlDay}>
							{day}
						</Text>
						<Text style={styles.hlMonth}>
							{month}
						</Text>
					</View>
				</View>
            </TouchableHighlight>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.logoCont}>
					<Logo scale={1} />
				</View>

				<View style={styles.dashboard}>
					<DashButton title='Update Details' img={updateDetailsIcon} nav={()=>this.props.navigation.navigate('UDMenu')} />
					<DashButton title='Outlook' img={outlookIcon} nav={()=>this.props.navigation.navigate('OutlookMag')} />
				</View>

				<View style={styles.dashboard}>
					<DashButton title='Events' img={eventsIcon} nav={()=>this.props.navigation.navigate('EventsList')} />
					<DashButton title='Promotions' img={promoIcon} nav={()=>this.props.navigation.navigate('Benefits')} />
				</View>

				<View style={styles.highlightsContainer}>
					<Text style={styles.highlightHeading}>
						Highlights
					</Text>

					{this.renderHighlight("Presentation", "25", "MAY", )}
				</View>

			</View>
		);
		}
	};
	
	const styles = StyleSheet.create({
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
		
		/////////////////////////////////////////HIGHLIGHTS
		highlightsContainer: {
			flex: 1.5,
			justifyContent: 'flex-end',
		},
		highlightHeading: {
			color: 'white',
			marginLeft: 10,
			marginTop: 20,
			marginBottom: 10,
			fontSize: 28,
		},
		/////////////Button
		hlBtn: {
			flex: 1,
			backgroundColor: 'white',
			borderWidth: 2,
			borderColor: 'white',
			marginBottom: 20,
			marginLeft: 10,
			marginRight: 10,
		},
		hlBtnView: {
			flex: 1,
			flexDirection: 'row',
		},
				hlCont: {
					flex: 2.5,
					padding: 20,
				},
						hlTitle: {
							fontSize: 24,
							color: '#0C2340',
							//margin: 30,
						},
				hlDate: {
					flex: 1,
					backgroundColor: '#0C2340',
					justifyContent: 'center',
				},
						hlDay: {
							fontSize: 36,
							textAlign: 'center',
							color: 'white',
							margin: 0,
						},
						hlMonth: {
							fontSize: 18,
							textAlign: 'center',
							color: '#cc0000',
							margin: 0,
						},
	});