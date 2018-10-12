
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import { DefaultButton } from '../CustomProps/DefaultButton';
import MapView from 'react-native-maps';

import {eventStyles} from '../styles/EventStyles';
import {baseStyles} from '../styles/BaseStyles';
import {styles} from '../styles/FormStyles';

const eventTmp = require('../assets/Event-Page-Banner.jpg');

export default class EventSingle extends Component {
	constructor(props){
		super(props);
	}
	static navigationOptions = {
		title: 'Event Information',
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
			cost: data.cost,
			blurb: data.blurb,
			image: 'https://www.youruowcommunity.edu.au/image/web/event-forms/Event-Page-Banner.jpg',
        });
    }
	renderDescription(){
		var parts = this.state.date.split('/');
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		return(
			<View style={eventStyles.heading}>
				<Text style={eventStyles.headTitle}>
					{this.state.eventname}
				</Text>
            </View>
		)
	}
	renderInfo(){
		return(
			<ScrollView styles={eventStyles.infoCont}>
				<View style={eventStyles.rowCont} >
					<Text style={eventStyles.infoTitle}>
						Time
					</Text>
					<Text style={eventStyles.infoText}>
						{this.state.starttime} - {this.state.endtime}
					</Text>
				</View>
				<View style={eventStyles.rowCont} >
					<Text style={eventStyles.infoTitle}>
						Venue
					</Text>
					<Text style={eventStyles.infoText}>
						{this.state.location + '\n' + this.state.address + '\n' + 
							this.state.city + ' ' +  this.state.locstate + '\n' + 
							this.state.postcode + ' ' + this.state.country}
					</Text>
				</View>
				<View style={eventStyles.rowCont} >
					<Text style={eventStyles.infoTitle}>
						Cost
					</Text>
					<Text style={eventStyles.infoText}>
						{this.state.cost}
					</Text>
				</View>
				<Text style={eventStyles.blurbText}>
					{this.state.blurb}
				</Text>
				
			</ScrollView>
		)
	}

	renderMap(){
		return(
			<View style={eventStyles.mapCont}>
				<MapView style={eventStyles.map}
					initialRegion={{
					latitude: 37.78825,
					longitude: -122.4324,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
					}}
				/>
			</View>
		);
	}
	

	render() {
		return (
			<View style={eventStyles.container}>
				{this.renderDescription()}
				{this.renderInfo()}
				{this.renderMap()}
				<View style={styles.submitBtnCont}>
                    <DefaultButton title='Register' nav={() => this.props.navigation.navigate('EventRego', {data: this.state.data})} />
                </View>
			</View>
		);
		}
};
	
	