
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
        var data = this.props.navigation.getParam('data', 'NoData');
        if(data == 'NoData'){
            console.error('NO DATA PASSED TO EVENT PAGE');
            this.props.navigation.goBack();
		}
		console.log(data.state);
		if(data.latitude == 0){
			console.warn('No Geocode');
			var vultr = this.props.screenProps;
			this.setState({vultr: this.props.screenProps});
			vultr.geocodeAddress(data)
			.then(() => {
				this.setState({
					isLoading: false,
					didLoad: true,
					data: vultr.data,
				});
	
			}).catch((err) => {
				this.setState({
					isLoading: false,
					didLoad: false,
				});
			})
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
			longitude: data.longitude,
			latitude: data.latitude,
        });
    }
	renderDescription(){
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
					latitude: this.state.latitude,
					longitude: this.state.longitude,
					latitudeDelta: 0.0150,
					longitudeDelta: 0.0150,
					}}
				>
				<Marker
					title={this.state.location}
					coordinate={{
						latitude: this.state.latitude,
						longitude: this.state.longitude
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
                    <DefaultButton title='Register' nav={() => this.props.navigation.navigate('EventRego', {data: this.state.data})} />
                </View>
			</View>
		);
		}
};
	
	