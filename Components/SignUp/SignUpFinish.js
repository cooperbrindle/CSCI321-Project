

import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, TextInput, View, TouchableHighlight, Image, ActivityIndicator} from 'react-native';
import { styles } from '../FormStyles';
import { DefaultButton } from '../CustomProps/DefaultButton';
import { Logo } from '../CustomProps/Logo.js';
import { baseStyles } from '../BaseStyles';

export default class SignUpFinish extends Component {
	
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
    
    submitForm() {
        
        this.setState({isLoading: true, errorMessage: ''});
        
        if(this.state.password != this.state.passwordConf){
            this.setState({isLoading: false, errorMessage: 'Passwords do not match'});
        }else{
            this.props.vultr.registerUser(this.state.email, this.state.password, this.state.id)
            .then((result) => {
                /////////////////////////////////////////////////////
                //////////// TODO: handle if user signs up with different email to alumni RE version
                /////////////////////////////////////////////////////
                
                this.setState({isLoading: false, errorMessage: ''});    
                this.props.navigation.navigate('HomeDrawer');
            }).catch(error => {
                this.setState({isLoading: false, errorMessage: error.message});
            });
        }
    }





    /////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////// UI /////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////

	renderInput(title, ph, stateValue, isSecure){
		return(
			<View style={styles.inputCont}>
                <Text style={styles.inputText}>
                    {title}
                </Text>
                <TextInput style={styles.inputBox}
                    placeholder={ph} underlineColorAndroid='transparent' placeholderTextColor='grey'
                    onChangeText={stateValue} secureTextEntry={isSecure} autoCapitalize='none'
                />
            </View>
		);
}

	render() {

        const actInd = this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View/>;
		return (
			<View style={styles.container}>

                <View style={stylesA.logoCont}>
                    <Logo scale={1}/>
                </View>

				<Text style={styles.title}>
                    Finalise Sign Up
                </Text>

                <Text style={baseStyles.errorText}>
                    {this.state.errorMessage}
                </Text>

                <View style={baseStyles.activityView}>
                    {actInd}
                </View>
                <ScrollView>

                {this.renderInput('email', this.state.email, (value) => this.setState({email: value}), false )}
                {this.renderInput('password', '', (value) => this.setState({password: value}), true )}
                {this.renderInput('confirm password', '', (value) => this.setState({passwordConf: value}), true )}
				
                </ScrollView>
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Continue' nav={() => this.submitForm()} />
                    <DefaultButton title='Back' nav={() => this.props.navigation.navigate('Login')} />
                </View>
			</View>
		);
		}
    };
    
    const stylesA = StyleSheet.create({
        logoCont: {
            flex: 0.5,
            marginTop: 50,
        },
    });