

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, 
    TextInput, Button, View, Image, TouchableHighlight} from 'react-native'; 
import { createStackNavigator } from 'react-navigation';
import { Logo } from './Logo';
import { DefaultButton } from './DefaultButton';
import { Sha256 } from './sha-256'
import { SocialButton } from './SocialButton';


export default class Login extends React.Component {
       

    loginPress() {
        this.props.navigation.navigate('Home')
    };

    render() {
        return (
        <View style={styles.container}>
            
            <View style={styles.logoCont} >
                <Logo scale={1}/>
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={styles.inputBox}
                    placeholder="student number" underlineColorAndroid='transparent' placeholderTextColor='grey'/>
                <TextInput style={styles.inputBox}
                    placeholder="password" underlineColorAndroid='transparent' placeholderTextColor='grey'/>
                
                <DefaultButton title='Login' nav={()=>this.props.navigation.navigate('Home')} />
                    
            </View>

            <View style={styles.socialContainer}>
                <SocialButton title='Continue with' nav={{}} />
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
});