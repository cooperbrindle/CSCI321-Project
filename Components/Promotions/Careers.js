

import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, Image} from 'react-native';

import { styles } from '../styles/FormStyles';
import { baseStyles } from '../styles/BaseStyles';
import { navigationOptionsFunc } from '../styles/navOptions';
import { DefaultButton } from '../CustomProps/DefaultButton';


const libraryLogo = require('../assets/careerSmart.jpg');

const blurbPoints = 'Career Consultations - Schedule an appointment with our experienced counsellors and consultants\n\n'+
            'Resume Review - Have our qualified team review your Resume\n\n'+
            'Workshops - Check out the workshop timetable and register online\n\n' +
            'Advertise Jobs- Have an employment oppotunity for UOW Students? Post it to CareerHub\n\n';

export default class Careers extends Component {
	static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Careers', navigation, false);
	}

	render() {
		return (
			<View style={baseStyles.container}>
                    <Image style={thisStyles.logo}
                        source={libraryLogo} />
				<ScrollView style={thisStyles.blurbView}>
                    
                    <Text style={thisStyles.blurbTextPoints}>
                        {blurbPoints}
                    </Text>
                </ScrollView>
				
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Login to CareerHub' nav={() => this.props.navigation.navigate('WebViewPage',
                            {link: 'https://careerhub.uow.edu.au/students/login?ReturnUrl=%2f',
                            title: 'CareerHub'})} />
                </View>

			</View>
		);
		}
    };
    
    const thisStyles = StyleSheet.create({
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
        blurbTextPoints: {
            color:'white',
            fontSize: 18,
            paddingLeft: 20,
        },
    });