

import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View, ActivityIndicator } from 'react-native';

//custom props
import { FormInput } from '../CustomProps/FormInput';
import { DefaultButton } from '../CustomProps/DefaultButton';
import { Logo } from '../CustomProps/Logo.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//styles
import { styles } from '../styles/FormStyles';
import { baseStyles } from '../styles/BaseStyles';
import { homeStyles } from '../styles/HomeStyles';
import { navigationOptionsFunc } from '../styles/navOptions';


export default class SignUpFinish extends Component {
    
    //Nav header
    static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Sign Up', navigation, false);
	}
    
    state = {
        errorMessage: '',
        isLoading: false,
        email: '',
        username: '',
        password: '',
        passwordConf: '',
    };

    //get emil passed to page and strip to get suggested username
    componentDidMount(){
        this.setState({vultr: this.props.screenProps});
        var emailProp = this.props.navigation.getParam('email', '');
        id = this.props.navigation.getParam('id', '');
        var un = '';
        try{ //strip email of everything from @ onwards
            un = emailProp.substr(0, emailProp.indexOf('@'));
        }catch(err){un = '';};
        this.setState({email: emailProp, id: id, username: un});
    }
    
    //submit button press handler
    submitForm() {
        
        this.setState({isLoading: true, errorMessage: ''});
            //NO USERNAME
        if(this.state.username == ''){
            this.setState({isLoading: false, errorMessage: 'No username'});
        }
            //PASSWORDS EMPTY OR DONT MATCH
        else if(this.state.password != this.state.passwordConf || (this.state.password == '' || this.state.passwordConf == '')){
            this.setState({isLoading: false, errorMessage: 'Passwords do not match'});
        }
        else{ //ELSE SUBMIT REGISTRATION TO BACKEND
            this.state.vultr.registerUser(this.state.username, this.state.password, this.state.id)
            .then((result) => {                
                this.setState({isLoading: false, errorMessage: ''});    
                this.props.navigation.navigate('HomeDrawer');
            }).catch(error => {
                this.setState({isLoading: false, errorMessage: error});
            });
        }
    }





    /////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////// UI /////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////


    //MAIN RENDER
	render() {

        const actInd = this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View/>;
		return (
			<View style={styles.container}>
            <KeyboardAwareScrollView>
            <ScrollView>
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

                <FormInput title='username' onChangeText={(a) => this.setState({username:a})} 
                    value={this.state.username} autoCapitalize='none'/>
                <FormInput title='password' onChangeText={(a) => this.setState({password:a})} 
                    value={this.state.password} secureTextEntry={true} autoCapitalize='none'/>
                <FormInput title='confirm password' onChangeText={(a) => this.setState({passwordConf:a})} 
                    value={this.state.passwordConf} secureTextEntry={true} autoCapitalize='none'/>
            
            </ScrollView>
            </KeyboardAwareScrollView>
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Continue' nav={() => this.submitForm()} />
                </View>
			</View>
		);
		}
    };