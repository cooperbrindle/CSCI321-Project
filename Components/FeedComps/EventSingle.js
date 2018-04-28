

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, View} from 'react-native'; 


class EventSingle extends Component {
	constructor(props){
		super(props);
		this.props.title = "TITLE";
		this.props.day = "18";
		this.props.month = "Aug";
	}
	  render() {
			return (
				<View style={styles.container}>
					<Text style={styles.title}>
						{this.props.title}
					</Text>
	
					<View style={styles.date}>
						<Text style={styles.dateDay}>
							{this.props.day}
						</Text>
						<Text style={styles.dateMonth}>
							{this.props.month}
						</Text>
					</View>
				</View>
			);
		  }
		};
		
		const styles = StyleSheet.create({
			container: {
				flex: 1,
				flexDirection: 'row',
				justifyContent: 'space-between',
				backgroundColor: 'white',
				height: 70,
			},
			title: {
				margin: 10,
				height: 80,
				justifyContent: 'center',
				fontSize: 20,
			},
			date: {
				height: 80,
				width: 60,
				justifyContent: 'center',
				backgroundColor: '#d9d9d6',
			},
			dateDay: {
				marginLeft: 15,
				align: 'center',
				fontSize: 22,
				color: 'black',
			},
			dateMonth: {
				marginLeft: 15,
				align: 'center',
				fontSize: 14,
				color: '#cc0000'
			},
			
		});