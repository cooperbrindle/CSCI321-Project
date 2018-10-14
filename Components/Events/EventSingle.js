
import React, { Component } from 'react';
import { Text, View, ScrollView} from 'react-native';
import { DefaultButton } from '../CustomProps/DefaultButton';
import MapView, { Marker } from 'react-native-maps';
import { navigationOptionsFunc } from '../styles/navOptions';
import {eventStyles} from '../styles/EventStyles';
import {styles} from '../styles/FormStyles';

export default class EventSingle extends Component {
	constructor(props){
		super(props);
	}
	static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Event Info', navigation, false);
	}

	componentWillMount(){
        var eventData = this.props.navigation.getParam('eventData', 'NoData');
        if(eventData == 'NoData')
			this.props.navigation.goBack();

		this.setState({
			errorMessage: '',
			eventData: eventData,
			longitude: eventData.longitude,
			latitude: eventData.latitude,
		});
		console.log(eventData);
		if(eventData.latitude == 0){
			console.log('No Geocode');
			var vultr = this.props.screenProps;
			this.setState({vultr: this.props.screenProps});
			vultr.geocodeAddress(eventData)
			.then((res) => {
				console.log(res.longitude);
				this.setState({
					isLoading: false,
					didLoad: true,
					longitude: res.longitude,
					latitude: res.latitude,
				});
			}).catch((err) => {
				this.setState({
					isLoading: false,
					didLoad: false,
				});
			})
		}
        
    }
	renderDescription(){
		return(
			<View style={eventStyles.heading}>
				<Text style={eventStyles.headTitle}>
					{this.state.eventData.eventname}
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
						{this.state.eventData.starttime} - {this.state.eventData.endtime}
					</Text>
				</View>
				<View style={eventStyles.rowCont} >
					<Text style={eventStyles.infoTitle}>
						Venue
					</Text>
					<Text style={eventStyles.infoText}>
						{this.state.eventData.locationname + '\n' + this.state.eventData.address + '\n' + 
							this.state.eventData.city + ' ' +  this.state.eventData.state + '\n' + 
							this.state.eventData.postcode + ' ' + this.state.eventData.country}
					</Text>
				</View>
				<View style={eventStyles.rowCont} >
					<Text style={eventStyles.infoTitle}>
						Cost
					</Text>
					<Text style={eventStyles.infoText}>
						{this.state.eventData.cost}
					</Text>
				</View>
				<Text style={eventStyles.blurbText}>
					{this.state.eventData.blurb}
				</Text>
				
			</ScrollView>
		)
	}

	renderMap(){
		return(
			<View style={eventStyles.mapCont}>
				<MapView style={eventStyles.map}
					region={{
					latitude: this.state.latitude,
					longitude: this.state.longitude,
					latitudeDelta: 0.0150,
					longitudeDelta: 0.0150,
					}}
				>
				<Marker
					title={this.state.eventData.location}
					coordinate={{
						latitude: this.state.latitude,
						longitude: this.state.longitude,
					}}
				/>
				</MapView>
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
                    <DefaultButton title='Register' nav={() => this.props.navigation.navigate('EventRego', {eventData: this.state.eventData})} />
                </View>
			</View>
		);
		}
};
	
	