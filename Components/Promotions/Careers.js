

import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, TextInput, View, Alert, Image} from 'react-native';
import { styles } from '../styles/FormStyles';
import { DefaultButton } from '../CustomProps/DefaultButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const libraryLogo = require('../assets/careerSmart.jpg');

const blurbPoints = 'Career Consultations - Schedule an appointment with our experienced counsellors and consultants\n\n'+
            'Resume Review - Have our qualified team review your Resume\n\n'+
            'Workshops - Check out the workshop timetable and register online\n\n' +
            'Advertise Jobs- Have an employment oppotunity for UOW Students? Post it to CareerHub\n\n';

export default class Careers extends Component {
	static navigationOptions = {
		title: 'Career Support',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
		},
    }

	render() {
		return (
			<View style={thisStyles.container}>
                    <Image style={thisStyles.logo}
                        source={libraryLogo} />
				<ScrollView style={thisStyles.blurbView}>
                    
                    <Text style={thisStyles.blurbTextPoints}>
                        {blurbPoints}
                    </Text>
                </ScrollView>
				
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Login to CareerHub' nav={() => this.props.navigation.navigate('CareerHub',
                            {link: 'https://careerhub.uow.edu.au/students/login?ReturnUrl=%2f',
                            title: 'CareerHub'})} />
                </View>

			</View>
		);
		}
    };
    
    const thisStyles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#0C2340',
        },
        blurbView: {
            flex:1,
            backgroundColor: '#0C2340',
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 20,
            marginBottom: 30,
        },
        logo: {
            flex:0.5,
            alignSelf: 'center',
            resizeMode: 'center',
        },
        blurbTextStart: {
            color:'white',
            fontSize: 18,
        },
        blurbTextPoints: {
            color:'white',
            fontSize: 18,
            paddingLeft: 20,
        },
        blurbTextEnd: {
            color:'white',
            fontSize: 14,
        },
    });