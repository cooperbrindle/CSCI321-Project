import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, ActivityIndicator, TouchableOpacity, AsyncStorage} from 'react-native'; 

import { Logo } from './CustomProps/Logo';
import { DefaultButton } from './CustomProps/DefaultButton';
import { SocialButton } from './CustomProps/SocialButton';
import { Facebook } from 'expo';

import { loginStyles } from './styles/LoginStyles';
import { baseStyles } from './styles/BaseStyles';


export default class Login extends React.Component {
    
    static navigationOptions = {
        header: null,
    };
    
    state = {
        username: '',
        password: '',
        errorMessage: '',
        isLoading: false,
        modalVisible: false,
    };

    async componentDidMount(){
        var vultr = this.props.screenProps;
        this.setState({
            isLoading: true,
            vultr: this.props.screenProps,
            username: vultr.username,
        });


        //LOAD TOKEN
        var token, username;
		try{ 
            token = await AsyncStorage.getItem('token');
            username = await AsyncStorage.getItem('username');
        }catch(err){
            console.log(err); 
            token = null;
            username = null;
        };
		vultr.loadData(token, username);
		
        if(vultr.isLoggedIn()){
            vultr.loadConstituent();
            this.props.navigation.navigate('HomeDrawer');
            return;
        }
        else{
            //TODO: REMOVE THIS ELSE - ONLY FOR TESTING
            this.setState({
                //username: 'ewarren',
                password: 'password',
            })
        }
        this.setState({isLoading: false});
    }

    loginPress() {
        
        this.setState({
            errorMessage: '',
            isLoading: true
        });
        
        const {username, password } = this.state;
        try{
            if(username != '' && password != ''){
               this.state.vultr.signInWithEmailPassword(username, password)
                .then((result) =>{
                    this.setState({isLoading: false});
                    this.props.navigation.navigate('HomeDrawer');
                })
                .catch((error) =>{
                    this.setState({errorMessage: [error], isLoading: false});
                });
            }else{
                this.setState({
                    errorMessage: 'Empty Fields',
                    isLoading: false
                });
            }
        }catch(err){console.warn('try catch: ' + err);
        this.setState({isLoading: false});}
    };

    signupPress() {
        this.props.navigation.navigate('SUForm');
    }

    async facebookLogin() {
        /*
        this.setState({isLoading: true});
        try{

            const { type, token } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
                permissions: ['public_profile', 'email']
            });
            if (type === 'success') {
                //user token
            }else{
                this.setState({ errorMessage: 'Login Cancelled', isLoading: false });    
            }
        }catch(error){
            this.setState({ errorMessage: error.message, isLoading: false });
        }
        */
    }


    renderButtons(){
        if(this.state.isLoading)
            return <View/>;
        else return (<View>
                <DefaultButton title='Login' nav={() => this.loginPress()} />
                <DefaultButton title='Sign Up' nav={() => this.signupPress()} />

                <TouchableOpacity onPress={() => {this.props.navigation.navigate('ForgotPassword')}}>
                    <Text style={loginStyles.forgotText}>
                        Forgot password?
                    </Text>
                </TouchableOpacity>
            </View>);
        
    }

    

    render() {

        const actInd = this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View/>;
        
        return (
        <View style={baseStyles.container}>
            
            <View style={loginStyles.logoCont} >
                <Logo scale={1}/>
            </View>
            
            <Text style={baseStyles.errorText}>{this.state.errorMessage}</Text>

            <View style={loginStyles.inputContainer}>
                
                <TextInput style={loginStyles.inputBox}
                    placeholder="username" underlineColorAndroid='transparent' placeholderTextColor='grey'
                    onChangeText={(un) => this.setState({username:un})}
                    value={this.state.username} />
                
                <TextInput style={loginStyles.inputBox}
                    placeholder="password" underlineColorAndroid='transparent' placeholderTextColor='grey'
                    onChangeText={(pw) => this.setState({password:pw})} secureTextEntry autoCapitalize='none'
                    value={this.state.password}/>
                
                {this.renderButtons()}
                
                <View style={baseStyles.activityView}>
                    {actInd}
                </View>
            </View>
            

            <View style={loginStyles.socialContainer}>
                <SocialButton title='Continue with' fbOnClick={()=>this.facebookLogin()} />
            </View>
        </View>
        );
  }
}

