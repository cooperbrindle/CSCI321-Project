

import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, TextInput, View, TouchableHighlight, Image} from 'react-native';
import { styles } from './FormStyles';
import { DefaultButton } from './DefaultButton';


export default class ContactForm extends Component {
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
                    Contact Info
                </Text>
                <ScrollView>

                {this.renderInput('email', 'Ya Boi')}
                {this.renderInput('Mobile', 'Shiny')}
                {this.renderInput('fuck this', 'whats this for')}
                {this.renderInput('address will be a pain', 'dankAdidly lane ya mums house whore')}
                {this.renderInput('united states of USA', '#Murica')}
				
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Discard' nav={() => this.props.navigation.navigate('UDMenu')} />
                </View>
                </ScrollView>
			</View>
		);
		}
	};
