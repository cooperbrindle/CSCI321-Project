

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, FlatList, View} from 'react-native'; 

import EventSingle from './Components/FeedComps/EventSingle';


const tempEvents = [
	{title: "Event1"},
	{title: "Event2"},
	{title: "Event3"},
	{title: "Event4"},
	{title: "Event5"},
	{title: "Event6"}
]

export default class Feed extends Component {
	constructor(props){
		super(props);
		this.props.eventDataSource = tempEvents;
	}


	renderEventSingle(event){
		return(
			<EventSingle
				title={event.title}
			/>
		)
	}

	render() {
		return (
		  <View style={styles.container}>
					<View style={styles.topMenuBar}>
						<Text>Menu</Text>
					</View>
					<View style={styles.topSection}>
						<View style={styles.middle}>
						  <Text>Update Details</Text>
						</View>
						<View style={styles.middle}>
						  <Text>Outlook</Text>
						</View>
					</View>
					<FlatList style={styles.events}
						data={this.props.eventDataSource}
						renderItem={({ item }) => {this.renderEventSingle.bind(this)}}
						keyExtractor={item => item.title}
					/>
				</View>
		);
	  }
	};
	
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#0C2340',
		},
		topMenuBar: {
			height: 30,
			backgroundColor: '#0047BB',
			fontSize: 12,
			justifyContent: 'center'
		},
		topSection: {
			flex: 1,
			flexDirection: 'row',
		},
		middle: {
		  flex: 1,
		  height: 60,
		  backgroundColor:'#d9d9d6',
		  fontSize:10,
		  alignItems: 'center',
		  justifyContent: 'center',
		},
		events: {
	
		},
		
	});