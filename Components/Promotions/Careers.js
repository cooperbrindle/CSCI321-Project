

import React, { Component } from 'react';
import { ScrollView, Text, View, Image} from 'react-native';
import { baseStyles } from '../styles/BaseStyles';
import { navigationOptionsFunc } from '../styles/navOptions';
import { DefaultButton } from '../CustomProps/DefaultButton';
import { staticStyles } from '../styles/BenefitsStyles'


const libraryLogo = require('../assets/careerSmart.jpg');

////////////////////////////////////////////////////////////////////////////////////////////
//Text to be displayed
const blurbPoints = 'Career Consultations - Schedule an appointment with our experienced counsellors and consultants\n\n'+
            'Resume Review - Have our qualified team review your Resume\n\n'+
            'Workshops - Check out the workshop timetable and register online\n\n' +
            'Advertise Jobs- Have an employment oppotunity for UOW Students? Post it to CareerHub\n\n';

export default class Careers extends Component {
	static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Career Support', navigation, false);
	}

    //////////////////////////////////////////////////////////////////////////////////////
    //Display the text and buttons
	render() {
		return (
			<View style={baseStyles.container}>
                    <Image style={staticStyles.logo}
                        source={libraryLogo} />
				<ScrollView style={staticStyles.blurbView}>
                    
                    <Text style={staticStyles.blurbTextPoints}>
                        {blurbPoints}
                    </Text>
                </ScrollView>
				
                <View style={staticStyles.submitBtnCont}>
                    <DefaultButton title='Login to CareerHub' nav={() => this.props.navigation.navigate('WebViewPage',
                            {link: 'https://careerhub.uow.edu.au/students/login?ReturnUrl=%2f',
                            title: 'CareerHub'})} />
                </View>

			</View>
		);
		}
    };