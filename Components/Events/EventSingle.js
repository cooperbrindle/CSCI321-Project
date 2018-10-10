
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, FlatList, View, TouchableHighlight, Image} from 'react-native';
import { DefaultButton } from '../CustomProps/DefaultButton';

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
	componentWillMount(){
        const data = this.props.navigation.getParam('data', 'NoData');
        if(data == 'NoData'){
            console.error('NO DATA PASSED TO EVENT PAGE');
            this.props.navigation.goBack();
        }
        this.setState({
			errorMessage: '',
			data: data,
            eventname: data.eventname,
			eventgroup: data.eventgroup,
			date: data.startdate,
			type: data.eventtype,
			starttime: data.starttime,
			endtime: data.endtime,
			location: data.locationname,
			address: data.address,
			city: data.city,
			locstate: data.state,
			postcode: data.postcode,
			country: data.country,
        });
    }
	renderDescription(){
		var parts = this.state.date.split('/');
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		return(
			<View style={styles.heading}>
				<View style={styles.headLeftCont}>
					<Text style={styles.headTitle}>
						{this.state.eventname}
					</Text>
				</View>
				<View style={styles.headDate}>
					<Text style={styles.headDay}>
						{parts[0]}
					</Text>
					<Text style={styles.headMonth}>
						{months[parts[1]-1]}
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
					{this.state.type}
				</Text>
				<Text style={styles.infoTitle}>
					Time
				</Text>
				<Text style={styles.infoText}>
					{this.state.starttime} - {this.state.endtime}
				</Text>
				<Text style={styles.infoTitle}>
					Venue
				</Text>
				<Text style={styles.infoText}>
					{this.state.location + '\n' + this.state.address + '\n' + 
						this.state.city + ' ' +  this.state.locstate + '\n' + 
						this.state.postcode + ' ' + this.state.country}
				</Text>
            </View>
		)
	}

	render() {
		return (
			<View style={styles.container}>
					{this.renderDescription()}
					{this.renderPic()}
					{this.renderInfo()}
				<View style={styles.submitBtnCont}>
                    <DefaultButton title='Register' nav={() => this.props.navigation.navigate('EventRego', {data: this.state.data})} />
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