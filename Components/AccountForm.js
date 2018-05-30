

import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, TextInput, View, TouchableHighlight, Image} from 'react-native';
import { styles } from './FormStyles';
import { DefaultButton } from './DefaultButton';


export default class AccountForm extends Component {
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
                    Account Info
                </Text>
                <ScrollView>
                <View style={styles.topInput}>
                    <View style={styles.inputContSmall}>
                        <Text style={styles.inputText}>
                            Title
                        </Text>
                        <TextInput style={styles.inputBoxSmall}
                            placeholder='Mr' underlineColorAndroid='transparent' placeholderTextColor='grey'/>
                    </View>
                    
                    <View style={styles.inputContDate}>
                        <Text style={styles.inputText}>
                            DD
                        </Text>
                        <TextInput style={styles.inputBoxDate}
                            placeholder='25' underlineColorAndroid='transparent' placeholderTextColor='grey'/>
                    </View>
                    <View style={styles.inputContDate}>
                        <Text style={styles.inputText}>
                            MM
                        </Text>
                        <TextInput style={styles.inputBoxDate}
                            placeholder='05' underlineColorAndroid='transparent' placeholderTextColor='grey'/>
                    </View>
                    <View style={styles.inputContYear}>
                        <Text style={styles.inputText}>
                            YYYY
                        </Text>
                        <TextInput style={styles.inputBoxDate}
                            placeholder='2018' underlineColorAndroid='transparent' placeholderTextColor='grey'/>
                    </View>
                    
                </View>

                {this.renderInput('First Name', 'Ya Boi')}
                {this.renderInput('Last Name', 'Shiny')}
                {this.renderInput('Student Number', '1234567')}
                {this.renderInput('Email (preferred)', 'YaBoi@uowmail.edu.au')}
				
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Discard' nav={() => this.props.navigation.navigate('UDMenu')} />
                </View>
                </ScrollView>
			</View>
		);
		}
	};