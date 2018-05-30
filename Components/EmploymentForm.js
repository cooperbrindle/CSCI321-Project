

import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, TextInput, View, TouchableHighlight, Image} from 'react-native';
import { styles } from './FormStyles';
import { DefaultButton } from './DefaultButton';


export default class EmploymentForm extends Component {
	static navigationOptions = {
		title: 'Update Details',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	}
	renderInput(title, ph){
		return(
			<View style={styles.inputCont}>
                <Text style={styles.inputText}>
                    {title}
                </Text>
                <TextInput style={styles.inputBox}
                    placeholder={ph} underlineColorAndroid='transparent' placeholderTextColor='grey'/>
            </View>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>
                    Employment Info
                </Text>
                <ScrollView>

                {this.renderInput('Job Title', 'Head Reciever')}
                {this.renderInput('Employer', 'C0op3rs m0m')}
                {this.renderInput('Country', 'sTr4ya')}
                {this.renderInput('City', 'Dat r1ch boI town dawG')}
                {this.renderInput('State / Country / Region', '')}
				
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Discard' nav={() => this.props.navigation.navigate('UDMenu')} />
                </View>
                </ScrollView>
			</View>
		);
		}
	};