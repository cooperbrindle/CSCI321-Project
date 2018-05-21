

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, 
    TextInput, Button, View, Image, TouchableOpacity, TouchableHighlight} from 'react-native'; 
import { createStackNavigator } from 'react-navigation';


export default class Login extends React.Component {

    loginPress() {
        this.props.navigation.navigate('Feed')
    };

  render() {
    return (
      <View style={styles.container}>


        <View style={styles.logoCont}>
            <Image
                style={styles.logo}
                resizeMode='center'
                resizeMethod='resize'
                source={require('./logo.png')}
            />
            <View style={styles.banner}>
                    <Text style={styles.bannerText}>
                        ALUMNI
                    </Text>
            </View>
        </View>

        <View style={styles.inputContainer}>
            <TextInput style={styles.inputBox}
                placeholder="student number" underlineColorAndroid='transparent' placeholderTextColor='grey'/>
            <TextInput style={styles.inputBox}
                placeholder="password" underlineColorAndroid='transparent' placeholderTextColor='grey'/>
            <TouchableHighlight style={styles.loginBtn}
                onPress={() => this.props.navigation.navigate('Feed')}>
                <Text style={styles.loginText}>
                        LOGIN
                </Text>
            </TouchableHighlight>
                
        </View>


        <View style={styles.socialContainer}>
            <TouchableHighlight style={styles.socialBtnFB}
                onPress={this._onPressButton}>
                    <Text style={styles.socialText}>
                        Continue with facebook
                    </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.socialBtnLI}
                onPress={this._onPressButton}>
                    <Text style={styles.socialText}>
                        Continue with Linkedin
                    </Text>
            </TouchableHighlight>
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
        flex: 2,
    },
    logo: {
        width: 252,
        height: 101,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    banner: {
        backgroundColor: 'white',
        margin: 0,
        justifyContent: 'center',
        padding: 10,
        flexDirection: 'row',
    },
    bannerText: {
        fontSize: 24,
        color: '#0C2340',
        fontWeight: 'bold',
    },


    /////////////////////////////////////////INPUT STYLES
    inputContainer: {
        flex: 2,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 40,
        marginBottom: 60,
    },
    inputBox: {
        alignItems: 'center',
        color: 'grey',
        marginBottom: 0,
        marginTop: 0,
        paddingLeft: 10,
        backgroundColor:'#d9d9d6',
        height: 45,
        borderRadius:10,
        borderWidth: 1,
    },
    loginBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:5,
        backgroundColor:'#0C2340',
        height: 45,
        borderRadius:10,
        borderWidth: 2,
        borderColor: '#d9d9d6',
    },
    loginText: {
        color: '#cc0000',
    },

    /////////////////////////////////////////SOCIAL STYLES
    socialContainer: {
        flex: 1,
        marginBottom: 30,
        marginLeft: 5,
        marginRight: 5,
    },
    socialBtnFB: {
        alignItems: 'center',
        height: 45,
        backgroundColor:'#3B5998',
        borderRadius:10,
        borderWidth: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    socialBtnLI: {
        alignItems: 'center',
        height: 45,
        backgroundColor:'#0077B5',
        borderRadius:10,
        borderWidth: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },/*
    socialView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialImage: {
        width: 20,
        height: 20,
    },*/
    socialText: {
        color: 'white',
        fontWeight: 'bold'
    },
});