

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, View} from 'react-native'; 


export default class Feed extends Component {
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
					<View style={styles.events}>
	
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