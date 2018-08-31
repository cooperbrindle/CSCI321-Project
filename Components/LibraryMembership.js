

import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, TextInput, View, Alert, Image} from 'react-native';
import { styles } from './FormStyles';
import { DefaultButton } from './DefaultButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const libraryLogo = require('./assets/libraryLogo.jpg');
const blurbStart = 'You are entitled to an Alumni Membership for the UOW Library.\n'+
            'With a membership, you can:\n\n';

const blurbPoints = '-  Access a wide range of online resources, including e-journals and databases\n\n'+
            '-  Borrow 30 items for 28 days at the Wollongong location, or five items at other locations\n\n'+
            '-  Renew items and place up to 10 holds at a time.\n\n';

const blurbEnd = 'New membership applications will be processed and confirmed within 5-7 business days via return email.\n'+
            'Memberships need to be renewed annually, and you will be sent a reminder.';

export default class AccountForm extends Component {
	static navigationOptions = {
		title: 'Library Membership',
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
        //TODO: Check if already submitted a request?
        /*
        const data = this.props.navigation.getParam('data', 'NoData');
        if(data == 'NoData'){
            console.error('NO DATA PASSED TO ACCOUNT FORM PAGE');
            this.props.navigation.goBack();
        }
        this.state = {
            errorMessage: '',
            firstName: data.firstName,
            keyName: data.keyName,
            day: data.birthDate.substr(0,2),
            month: data.birthDate.substr(2,2),
            year: data.birthDate.substr(4,4),
            ssn: data.ssn
            preferredEmail: '',
        };*/
        this.state = {
            preferredEmail: '',
        };
    }

    submit(){
        Alert.alert(
            'Submitted',
            blurbEnd,
            [
                {text: 'OK', onPress: () => this.props.navigation.goBack()},
            ],
            { cancelable: false }

        )
        //TODO: submit request
    }
    
	renderInput(title, ph, onChangeT, v, edita){
		return(
			<View style={styles.inputCont}>
                <Text style={styles.inputText}>
                    {title}
                </Text>
                <TextInput style={styles.inputBox}
                    placeholder={ph} underlineColorAndroid='transparent' placeholderTextColor='grey'
                    onChangeText={onChangeT}
                    value={v} editable = {edita}/>
            </View>
		)
	}

	render() {
		return (
			<View style={styles.container}>
                <View style={thisStyles.logoView}>
                <Image style={thisStyles.logo}
                    source={libraryLogo} />
                </View>

                <Text style={styles.title}>
                    Claim your library card!
                </Text>

				<ScrollView style={thisStyles.blurbView}>
                    <Text style={thisStyles.blurbTextStart}>
                        {blurbStart}
                    </Text>
                    <Text style={thisStyles.blurbTextPoints}>
                        {blurbPoints}
                    </Text>
                </ScrollView>
                
                {/*this.renderInput('Preferred Email', '', (a) => this.setState({preferredEmail:a}), this.state.preferredEmail, true)*/}
				
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Submit' nav={() => this.submit()} />
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
        logoView: {
            flex:0.4,
            align: 'center',
            justifyContent: 'center',
        },
        logo: {
            resizeMode: 'center',
        },
        blurbTextStart: {
            color:'white',
            fontSize: 18,
        },
        blurbTextPoints: {
            color:'white',
            fontSize: 22,
            paddingLeft: 20,
        },
        blurbTextEnd: {
            color:'white',
            fontSize: 14,
        },
    });