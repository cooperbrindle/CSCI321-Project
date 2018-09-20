

import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, TextInput, View, TouchableHighlight, Image, ActivityIndicator} from 'react-native';
import { styles } from './FormStyles';
import { DefaultButton } from './DefaultButton';
import { Logo } from './Logo.js';


export default class SignUpFinish extends Component {
	
    state = {
        errorMessage: '',
        isLoading: false,
        email: '',
        password: '',
        passwordConf: '',
    };

    componentDidMount(){
        this.props.firebase = this.props.screenProps;
        var emailProp = this.props.navigation.getParam('email', '**error passing email info**');
        this.setState({email:  emailProp});
        this.props.constitID = this.props.navigation.getParam('constitID', '');
        if(this.props.constitID = ''){
            //TODO: handle blank constitID error
                //possibly show redirect button back to signupForm
        }
    }
    
    submitForm() {
        
        this.setState({isLoading: true, errorMessage: ''});
        
        if(this.state.password != this.state.passwordConf){
            this.setState({isLoading: true, errorMessage: 'Passwords do not match'});
        }else{
            this.props.firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                /////////////////////////////////////////////////////
                //////////// TODO: handle if user signs up with different email to alumni RE version
                /////////////////////////////////////////////////////
                
                //create document in appUser linking new user to corresponding contituent
                /*this.props.firebase.firestore().collection('appUser').doc(user.uid).set({
                    constituentID: this.props.constitID,
                    //possibly add date joined and other data
                }).then(() => {
                    */this.setState({isLoading: false, errorMessage: ''});    
                    this.props.navigation.navigate('Home');/* 
                }).catch((error) =>{
                    // TODO: is this handled by the outer catch as well????????
                });*/
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
                    onChangeText={stateValue} secureTextEntry={isSecure}
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

                <Text style={stylesA.errorText}>
                    {this.state.errorMessage}
                </Text>

                <View style={stylesA.activityView}>
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
       
       errorText: {color: 'red',},

        activityView: {
            justifyContent: 'center',
            alignContent: 'center',
        },

        logoCont: {
            flex: 0.5,
            marginTop: 50,
        },
    });