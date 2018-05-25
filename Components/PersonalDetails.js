

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, FlatList, View, TouchableHighlight, Image} from 'react-native';

const dashTmp = './assets/dashTmp.png';
const fbLogo = './assets/fblogo.png';
const liLogo = './assets/lilogo.png';

export default class UpdateDetailsMenu extends Component {
	
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
                    Personal
                </Text>
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
                {this.renderInput('Email (preffered)', 'YaBoi@uowmail.edu.au')}
				
                <View style={styles.submitBtnCont}>
                    <TouchableHighlight style={styles.submitBtn}
                        onPress={() => this.props.navigation.navigate('UDMenu')}>
                        <Text style={styles.submitBtnText}>
                                Save Changes
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.submitBtn}
                        onPress={() => this.props.navigation.navigate('UDMenu')}>
                        <Text style={styles.submitBtnText}>
                                Discard Changes
                        </Text>
                    </TouchableHighlight>
                        
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

        /////////////////////////////////////////
        title: {
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 28,
            color: 'white',
            marginBottom: 10,
        },

        /////////////////////////////////////////Containers
        topInput: {
            flexDirection: 'row',
            marginRight: 5,
            marginLeft: 5,
            marginTop: 10,
            marginBottom: 10,
        },
        dateCont: {
            flexDirection: 'row',
        },

        inputCont: {
            flexDirection: 'column',
            marginLeft: 5,
            marginRight: 5,
            marginTop: 10,
            marginBottom: 10,
        },
        inputContSmall: {
            flex: 4,
            flexDirection: 'column',
            marginRight: 60,
        },
        inputContDate: {
            flex: 1,
            flexDirection: 'column',
            marginLeft: 10,
        },
        inputContYear: {
            flex: 2,
            flexDirection: 'column',
            marginLeft: 10,
        },

        //////////////////////////////////////////Inputs
        inputText: {
            alignSelf: 'flex-start',
            textAlign: 'right',
            fontSize: 18,
            color: 'white',
        },
        inputBox: {
            color: 'grey',
            paddingLeft: 10,
            backgroundColor:'#d9d9d6',
            height: 50,
            borderRadius:5,
        },
        inputBoxSmall: {
            color: 'grey',
            backgroundColor:'#d9d9d6',
            height: 50,
            borderRadius:5,
        },
        inputBoxDate: {
            color: 'grey',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor:'#d9d9d6',
            height: 50,
            borderRadius:5,
        },

        /////////////////////////////////////////SUBMIT BUTTONS
        submitBtnCont: {
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 10,
            alignContent: 'flex-start',
            justifyContent: 'flex-end',
        },
        submitBtn: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:5,
            backgroundColor:'#0C2340',
            height: 50,
            borderRadius:10,
            borderWidth: 2,
            borderColor: '#d9d9d6',
        },
        submitBtnText: {
            color: '#cc0000',
            fontWeight: 'bold',
        },
		
	});
