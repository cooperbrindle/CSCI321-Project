

import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, TextInput, View, TouchableHighlight, Image} from 'react-native';
import { styles } from '../FormStyles';
import { DefaultButton } from '../CustomProps/DefaultButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class EmploymentForm extends Component {
	static navigationOptions = {
		title: 'Update Details',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
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
                    Employment Info
                </Text>
                <KeyboardAwareScrollView
				style={{ backgroundColor: '#4c69a5' }}
				resetScrollToCoords={{ x: 0, y: 0 }}
				contentContainerStyle={styles.container}
		  		scrollEnabled={false}>

                {this.renderInput('Job Title', 'Dev Leader')}
                {this.renderInput('Employer', 'Big Ole Company')}
                {this.renderInput('Country', 'Australia')}
                {this.renderInput('City', 'Wollongong')}
                {this.renderInput('State / Country / Region', 'Somewhere')}
				
                </KeyboardAwareScrollView>
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Discard' nav={() => this.props.navigation.goBack()} />
                </View>
			</View>
		);
		}
	};