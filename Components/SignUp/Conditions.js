

import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, TextInput, View, Alert, Image} from 'react-native';
import { styles } from '../styles/FormStyles';
import { DefaultButton } from '../CustomProps/DefaultButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const blurbPoints = '-  Access a wide range of online resources, including e-journals and databases\n\n'+
            '-  Borrow 30 items for 28 days at the Wollongong location, or five items at other locations\n\n'+
            '-  Renew items and place up to 10 holds at a time.\n\n';

const blurbEnd = 'New membership applications will be processed and confirmed within 5-7 business days via return email.';

export default class Conditions extends Component {
	static navigationOptions = {
		title: 'Terms and Conditions',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
		},
    }

    state = {
        errorMessage: '',
        isLoading: false,
        email: '',
        password: '',
        passwordConf: '',
    };

    componentDidMount(){
        this.props.vultr = this.props.screenProps;
        var emailProp = this.props.navigation.getParam('email', '**error passing email info**');
        id = this.props.navigation.getParam('id', '');
        this.setState({email: emailProp, id: id});
    }
    
    /////////////////////////////////////
    //
    submit(){
        this.setState({errorMessage: '', isLoading: true});
        this.props.navigation.navigate('SUFinish', {
            email: this.state.email,
            id: this.state.id,
        });
    }
    refuse(){
        Alert.alert(
            'Account Not Created',
            'Unfortunately you did not accept our Terms and Conditions.\nYou will now be redirected to the login page!',
            [
                {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
            ],
            { cancelable: false }
        )
    }

	render() {
		return (
			<View style={thisStyles.container}>
				<ScrollView style={thisStyles.blurbView}>         
                    <Text style={thisStyles.blurbTextPoints}>
                        {blurbPoints}
                    </Text>
                </ScrollView>
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Accept' nav={() => this.submit()} />
                    <DefaultButton title='Decline' nav={() => this.refuse()} />
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
        title: {
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 36,
            color: 'white',
            marginBottom: 10,
        },
        blurbView: {
            flex:1,
            backgroundColor: '#0C2340',
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: 10,
            marginBottom: 10,
        },
        logo: {
            flex:0.5,
            alignSelf: 'center',
            resizeMode: 'center',
        },
        blurbTextPoints: {
            color:'white',
            fontSize: 10,
            paddingLeft: 20,
        },
        blurbTextEnd: {
            color:'white',
            fontSize: 14,
        },
    });