

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

	/////////////////////////////////////
    //
    componentWillMount(){
        //create new structure here with only the required information

        //this.setState({thisData, changedData});
    }
    //
	/////////////////////////////////////
	
	
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

				{this.renderInput('email (preferred)', 'js@uowmail.edu.au')}
				{this.renderInput('Other email', '')}
                {this.renderInput('Mobile', '0441234567')}
                {this.renderInput('Address', 'This field will be expanded out in the future')}
                {this.renderInput('City', 'Wollongong')}
				
                </ScrollView>
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Discard' nav={() => this.props.navigation.navigate('UDMenu')} />
                </View>
			</View>
		);
		}
	};
