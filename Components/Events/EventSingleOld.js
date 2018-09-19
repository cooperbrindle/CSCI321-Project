
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, FlatList, View, TouchableHighlight, Image} from 'react-native';
import { DefaultButton } from '../DefaultButton';

const eventTmp = require('../assets/tree.jpg');

export default class EventSingle extends Component {
	constructor(props){
		super(props);
	}
	static navigationOptions = {
		title: 'Event',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	}
	renderDescription(title, day, month){
		return(
			<View style={styles.heading}>
				<View style={styles.headLeftCont}>
					<Text style={styles.headTitle}>
						{title}
					</Text>
					<Text style={styles.headText}>
						Join fellow alumni for drinks and canapes
					</Text>
				</View>
				<View style={styles.headDate}>
					<Text style={styles.headDay}>
						{day}
					</Text>
					<Text style={styles.headMonth}>
						{month}
					</Text>
				</View>
            </View>
		)
	}
	renderPic(){
		return(
			<View style={styles.imageCont}>
				<Image
					style={styles.eventImg}
					resizeMode={'contain'}
					source={eventTmp}	
				/>
            </View>
		)
	}
	renderInfo(){
		return(
			<View style={styles.infoCont} >
				<Text style={styles.infoTitle}>
					Cost:
				</Text>
				<Text style={styles.infoText}>
					Alumni: complimentary, Guest: $20pp
				</Text>
				<Text style={styles.infoTitle}>
					Time
				</Text>
				<Text style={styles.infoText}>
					5pm - 9pm
				</Text>
				<Text style={styles.infoTitle}>
					Venu:
				</Text>
				<Text style={styles.infoInfo}>
					Room 233, UOW Building 3, Keiraville NSW
				</Text>
            </View>
		)
	}

	render() {
		return (
			<View style={styles.container}>
					{this.renderDescription("Boston Alumni Event 2018", "25", "MAY", )}
					{this.renderPic()}
					{this.renderInfo()}
				<View style={styles.submitBtnCont}>
                    <DefaultButton title='Register' nav={() => this.props.navigation.navigate('')} />
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
		/////////////////////////////////////////HEADING
		heading: {
			flex: 1,
			flexDirection: 'row',
			backgroundColor: 'white',
			borderWidth: 2,
			borderColor: 'white',
			marginBottom: 10,
			marginLeft: 5,
			marginRight: 5,
		},
				headLeftCont: {
					flex: 2.5,
					padding: 20,
				},
						headTitle: {
							fontSize: 24,
							color: '#0C2340',
							textAlign: 'center',
							alignSelf: 'center',
						},
						headText: {
							fontSize: 16,
							color: '#0C2340',
							textAlign: 'left',
							alignSelf: 'center',
						},
				headDate: {
					flex: 1,
					backgroundColor: '#0C2340',
					justifyContent: 'center',
				},
						headDay: {
							fontSize: 36,
							textAlign: 'center',
							color: 'white',
							margin: 0,
						},
						headMonth: {
							fontSize: 18,
							textAlign: 'center',
							color: '#cc0000',
							margin: 0,
						},
		/////////////////////////////////////////EVENT IMAGE
		imageCont: {
			flex: 1,
			marginBottom: 10,
			marginLeft: 5,
			marginRight: 5,
			justifyContent: 'center',
			alignContent: 'center',
			borderWidth: 2,
			borderColor: 'white',
		},
		eventImg: {
			alignSelf: 'center',
		},

		/////////////////////////////////////////EVENT INFO
		infoCont: {
			flex: 2,
			marginBottom: 10,
			marginLeft: 5,
			marginRight: 5,
			padding: 10,
			backgroundColor: 'white',
		},
		infoTitle: {
			fontSize: 24,
			color: '#0C2340',
		},
		infoText: {
			fontSize: 18,
			padding: 10,
			color: '#0C2340',
		},

		/////////////////////////////////////////REGISTER
		submitBtnCont: {
			marginBottom: 10,
			marginLeft: 5,
			marginRight: 5,
			alignContent: 'flex-start',
			justifyContent: 'flex-end',
		},
	});