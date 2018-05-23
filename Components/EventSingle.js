
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, FlatList, View, TouchableHighlight, Image} from 'react-native';


const tempEvents = [
	{title: "Event1"},
	{title: "Event2"},
	{title: "Event3"},
	{title: "Event4"},
	{title: "Event5"},
	{title: "Event6"}
]

const dashTmp = './assets/dashTmp.png';
const uowLogo = './assets/logo.png';
const eventTmp = './assets/tree.jpg';

export default class EventSingle extends Component {
	constructor(props){
		super(props);
		this.props.eventDataSource = tempEvents;
	}
	static navigationOptions = {
		title: '*EventTitle*',
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
				<View style={styles.headingView}>
					<View style={styles.hlCont}>
						<Text style={styles.hlTitle}>
							{title}
						</Text>
						<Text style={styles.hlText}>
							Join fellow alumni for drinks and canapes
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
            </View>
		)
	}
	renderPic(){
		return(
			<View style={styles.dashBtn}>
				<View style={styles.dashBtnContainer}>
					<Image
						style={styles.eventImg}
						resizeMode={'center'}
						source={require(eventTmp)}	
                    />
				</View>
            </View>
		)
	}
	renderInfoBanner(){
		return(
			<View style={styles.dashBtn}
					onPress={this._onPressButton}>
				<View style={styles.dashBtnContainer}>
					<Text style={styles.dashText}>
						Cost: Example cost, free for all Alumni. $20pp for Other Guests
					</Text>
					<Text style={styles.dashText}>
						Time: 5pm
					</Text>
					<Text style={styles.dashText}>
						Venue: Room 233, UOW Building 3, Keiraville NSW
					</Text>
				</View>
            </View>
		)
	}
	renderRegister(){
		return(
			<TouchableHighlight style={styles.registerBtn}
					onPress={this._onPressButton}>
				<Text style={styles.registerBtnText}>
					Register
				</Text>
            </TouchableHighlight>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.dashboard}>
					{this.renderDescription("Boston Alumni Event 2018", "25", "MAY", )}
				</View>		
				<View style={styles.dashboard}>
					{this.renderPic()}
				</View>

				<View style={styles.dashboard}>
					{this.renderInfoBanner()}
				</View>
				<View style={styles.headingContainer}>
					{this.renderRegister()}
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
		headingContainer: {
			flex: 1,
		},
		heading: {
			flex: 1,
			backgroundColor: 'white',
			borderWidth: 2,
			borderColor: 'white',
			marginBottom: 0,
			marginLeft: 10,
			marginRight: 10,
		},
		headingView: {
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
							textAlign: 'center',
							alignSelf: 'center',
							//margin: 30,
						},
						hlText: {
							fontSize: 16,
							color: '#0C2340',
							textAlign: 'center',
							alignSelf: 'center',
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
		/////////////////////////////////////////EVENT IMAGE
		eventImg: {
			alignSelf: 'center',
		},
		/////////////////////////////////////////DASH BOARD
		dashboard: {
			flex: 1,
			flexDirection: 'row',
			marginLeft: 10,
			marginRight: 10,
			justifyContent: 'space-between',
		},
				dashBtn: {
					flex: 1,
					margin: 5,
					backgroundColor: 'white',
					justifyContent: 'center',
					alignContent: 'center',
				},
				dashBtnContainer: {
					justifyContent: 'center',
					alignContent: 'center',
				},
						dashText: {
							color: '#0C2340',
							fontSize: 16,
							textAlign: 'left',
							marginBottom: 2,
						},



		/////////////////////////////////////////REGISTER
		registerContainer: {
			flex: 1,
		},
		registerBtn: {
			justifyContent: 'center',
			alignItems: 'center',
			marginTop:5,
			backgroundColor:'#0C2340',
			height: 50,
			borderRadius:10,
			borderWidth: 2,
			borderColor: '#d9d9d6',
		},
		registerBtnText: {
            color: '#cc0000',
        },
	});