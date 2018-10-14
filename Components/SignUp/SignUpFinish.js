

import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { DefaultButton } from '../CustomProps/DefaultButton';
import { Logo } from '../CustomProps/Logo.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from '../styles/FormStyles';
import { baseStyles } from '../styles/BaseStyles';
import { homeStyles } from '../styles/HomeStyles';

import { navigationOptionsFunc } from '../styles/navOptions';

export default class SignUpFinish extends Component {
    
    static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Sign Up', navigation, false);
	}
    
    state = {
        errorMessage: '',
        isLoading: false,
        email: '',
        password: '',
        passwordConf: '',
    };

    componentDidMount(){
        this.setState({vultr: this.props.screenProps});
        var emailProp = this.props.navigation.getParam('email', '**error passing email info**');
        id = this.props.navigation.getParam('id', '');
        this.setState({email: emailProp, id: id});
    }
    
    submitForm() {
        
        this.setState({isLoading: true, errorMessage: ''});
        
        if(this.state.password != this.state.passwordConf){
            this.setState({isLoading: false, errorMessage: 'Passwords do not match'});
        }else{
            this.state.vultr.registerUser(this.state.email, this.state.password, this.state.id)
            .then((result) => {                
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

	renderInput(title, ph, stateValue, isSecure, isEditable){
		return(
			<View style={styles.inputCont}>
                <Text style={styles.inputText}>
                    {title}
                </Text>
                <TextInput style={styles.inputBox}
                    placeholder={ph} underlineColorAndroid='transparent' placeholderTextColor='grey'
                    onChangeText={stateValue} secureTextEntry={isSecure} autoCapitalize='none' editable={isEditable}
                />
            </View>
		);
}

	render() {

        const actInd = this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View/>;
		return (
			<View style={styles.container}>
            <KeyboardAwareScrollView>
            <View>
                <View style={{marginTop:0}}/>
                <View style={homeStyles.logoCont}>
                    <Logo scale={1}/>
                </View>
                <View style={{marginTop:20}}/>
				<Text style={styles.title}>
                    Finalise Sign Up
                </Text>

                <Text style={baseStyles.errorText}>
                    {this.state.errorMessage}
                </Text>

                <View style={baseStyles.activityView}>
                    {actInd}
                </View>

                {this.renderInput('email', this.state.email, (value) => this.setState({email: value}), false, false )}
                {this.renderInput('password', '', (value) => this.setState({password: value}), true, true )}
                {this.renderInput('confirm password', '', (value) => this.setState({passwordConf: value}), true, true )}
			</View>
            </KeyboardAwareScrollView>
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