

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';
import { DashButton } from './DashButton';
import { Logo } from './Logo';

const dashTmp = require('./assets/dashTmp.png');

export default class Promotions extends Component {
	constructor(props){
		super(props);
	}
	
	static navigationOptions = {
		title: 'Home',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	}

	renderdashBtnSmall(title){
		return(
			<TouchableHighlight style={styles.dashBtnSmall}
					onPress={() => this.props.navigation.navigate('Home')}>
				<View style={styles.dashBtnContainerSmall}>
					<Image
                        style={styles.dashBtnImgSmall}
                        source={dashTmp}
                    />
					<Text style={styles.dashTextSmall}>
						{title}
					</Text>
				</View>
            </TouchableHighlight>
		)
	}
	renderdashBtnNA(title){
		return(
			<TouchableHighlight style={styles.dashBtnSmall}
					onPress={() => this.props.navigation.navigate('Home')}>
				<View style={styles.dashBtnContainerSmall}>
					<Image
                        style={styles.dashBtnImgSmall}
                        source={dashTmp}
                    />
					<Text style={styles.dashTextSmall}>
						{title}
					</Text>
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
					<DashButton title='Discounts' img={dashTmp} nav={()=>this.props.navigation.navigate('Discounts')} />
					<DashButton title='Library Membership' img={dashTmp} nav={()=>this.props.navigation.navigate('LibraryMem')} />
				</View>

				<View style={styles.dashboardSmall}>
					{this.renderdashBtnSmall("Careers")}
					{this.renderdashBtnNA("Mentoring")}
					{this.renderdashBtnNA("Volunteering")}
					{this.renderdashBtnSmall("Scholarships")}
				</View>

				<View style={styles.highlightsContainer}>
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
			//marginTop: 10,
			flex: 1,
		},
		logo: {
			width: 180,
			height: 72,
			flexDirection: 'row',
			alignSelf: 'center',
		},
		banner: {
			//marginTop: 8,
			backgroundColor: 'white',
			margin: 0,
			justifyContent: 'center',
			padding: 5,
			paddingBottom: 10,
			flexDirection: 'row',
			marginBottom: 10,
		},
		bannerText: {
			fontSize: 18,
			color: '#0C2340',
			fontWeight: 'bold',
		},
		

		/////////////////////////////////////////DASH BOARD
		dashboard: {
			flex: 1,
			flexDirection: 'row',
			marginLeft: 7,
			marginRight: 7,
			justifyContent: 'space-between',
		},
/////////////////////////////////////////DASH BOARD    SMALL
dashboardSmall: {
	flex: 0.75,
	flexDirection: 'row',
	marginLeft: 7,
	marginRight: 7,
	justifyContent: 'space-between',
},
		dashBtnSmall: {
			flex: 1,
			margin: 5,
			backgroundColor: 'white',
			justifyContent: 'center',
			alignContent: 'center',
		},
		dashBtnNA: {
			flex: 1,
			margin: 5,
			opacity: 0.5,
			backgroundColor: 'black',
			justifyContent: 'center',
			alignContent: 'center',
		},
		dashBtnContainerSmall: {
			justifyContent: 'center',
			alignContent: 'center',
		},
				dashBtnImgSmall: {
					width: 30,
					height: 30,
					alignSelf: 'center',
				},
				dashTextSmall: {
					color: '#0C2340',
					fontSize: 12,
					marginTop: 10,
					textAlign: 'center',
					alignSelf: 'center',
				},

		/////////////////////////////////////////HIGHLIGHTS
		highlightsContainer: {
			flex: 1.5,
		},
		highlightHeading: {
			color: 'white',
			marginLeft: 10,
			marginTop: 20,
			marginBottom: 20,
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
