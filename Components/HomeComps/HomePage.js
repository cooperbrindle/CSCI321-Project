

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, FlatList, View, TouchableHighlight} from 'react-native';

import { EventSingle } from './EventSingle.js';


const tempEvents = [
	{title: "Event1"},
	{title: "Event2"},
	{title: "Event3"},
	{title: "Event4"},
	{title: "Event5"},
	{title: "Event6"}
]




export default class HomePage extends Component {
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

	renderdashBtn(title){
		return(
			<TouchableHighlight style={styles.dashBtn}
					onPress={this._onPressButton}>
				<Text style={styles.dashText}>
					{title}
				</Text>
            </TouchableHighlight>
		)
	}

	renderHighlight(title, day, month){
		return(
			<TouchableHighlight style={styles.hlBtn}
					onPress={this._onPressButton}>
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
					
				<View style={styles.dashboard}>
					{this.renderdashBtn("Update Details")}
					{this.renderdashBtn("Outlook")}
				</View>

				<View style={styles.dashboard}>
					{this.renderdashBtn("Events")}
					{this.renderdashBtn("Promotions")}
				</View>

				<View style={styles.dashboard}>
					{this.renderdashBtn("Networking")}
					{this.renderdashBtn("Mentoring")}
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
		

		/////////////////////////////////////////DASH BOARD
		dashboard: {
			flex: 1,
			flexDirection: 'row',
			marginLeft: 5,
			marginRight: 5,

		},
				dashBtn: {
					flex: 1,
					margin: 5,
					backgroundColor: 'white',
					justifyContent: 'center',
					alignContent: 'center',
				},
						dashText: {
							color: '#0C2340',
							fontSize: 18,
							//fontWeight: 'bold',
							textAlign: 'center',
							alignSelf: 'center',
						},


		/////////////////////////////////////////HIGHLIGHTS
		highlightsContainer: {
			flex: 2,
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
			marginBottom: 50,
		},
		hlBtnView: {
			flex: 1,
			flexDirection: 'row',
		},
				hlCont: {
					flex: 2.5,
				},
						hlTitle: {
							fontSize: 24,
							color: '#0C2340',
							margin: 30,
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