import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, ActivityIndicator, TouchableOpacity} from 'react-native'; 
import { Logo } from './CustomProps/Logo';
import { DefaultButton } from './CustomProps/DefaultButton';
import { SocialButton } from './CustomProps/SocialButton';
import { Facebook } from 'expo';

import { baseStyles } from './BaseStyles';


export default class Login extends React.Component {
    
    state = {
        username: '',
        password: '',
        errorMessage: '',
        isLoading: false,
    };

    componentDidMount(){
        var vultr = this.props.screenProps;

        this.setState({
            isLoading: false,
            vultr: this.props.screenProps,
            username: vultr.username,
        });

		if(vultr.isLoggedIn()){
            vultr.loadConstituent();
            this.props.navigation.navigate('HomeDrawer');
        }
        else{
            //TODO: REMOVE THIS ELSE - ONLY FOR TESTING
            this.setState({
                username: 'ewarren',
                password: 'password',
            })
        }
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
                    this.setState({errorMessage: error, isLoading: false});
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

                <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.forgotText}>
                        Forgot password?
                    </Text>
                </TouchableOpacity>
            </View>);
        
    }
    

    render() {

        const actInd = this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View/>;
        
        return (
        <View style={styles.container}>
            
            <View style={styles.logoCont} >
                <Logo scale={1}/>
            </View>
            
            <Text style={baseStyles.errorText}>{this.state.errorMessage}</Text>

            <View style={styles.inputContainer}>
                
                <TextInput style={styles.inputBox}
                    placeholder="username" underlineColorAndroid='transparent' placeholderTextColor='grey'
                    onChangeText={(un) => this.setState({username:un})}
                    value={this.state.username} />
                
                <TextInput style={styles.inputBox}
                    placeholder="password" underlineColorAndroid='transparent' placeholderTextColor='grey'
                    onChangeText={(pw) => this.setState({password:pw})} secureTextEntry autoCapitalize='none'
                    value={this.state.password}/>
                
                {this.renderButtons()}
                
                <View style={baseStyles.activityView}>
                    {actInd}
                </View>
            </View>
            

            <View style={styles.socialContainer}>
                <SocialButton title='Continue with' fbOnClick={()=>this.facebookLogin()} />
            </View>
        </View>
        );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0C2340',
    },

    logoCont: {
        marginTop: 50,
        flex: 2,
    },
    
    errorText: {color: 'red',},

    activityView: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    /////////////////////////////////////////INPUT STYLES
    inputContainer: {
        flex: 2.5,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 60,
        alignContent: 'flex-start',
    },
    inputBox: {
        alignItems: 'center',
        color: 'grey',
        marginBottom: 0,
        marginTop: 0,
        paddingLeft: 10,
        backgroundColor:'#d9d9d6',
        height: 50,
        borderRadius:5,
        borderWidth: 1,
    },

    /////////////////////////////////////////SOCIAL STYLES
    socialContainer: {
        flex: 1,
        marginBottom: 30,
        marginLeft: 5,
        marginRight: 5,
    },

    /////////////////////////////////////////FORGOT STYLES
    forgotView: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
    },
    forgotText: {
        color: '#0047BB',
        fontSize: 14,
        alignSelf: 'center',
        paddingTop: 20,
    }
});