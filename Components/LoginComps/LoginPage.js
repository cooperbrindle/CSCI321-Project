

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
        <View  style={styles.titleContainer}>
            <Image
                style={{width: 380, height: 120, paddingBottom: 10,}}
                source={require('./logo.png')}
            />
        </View>


        <View style={styles.inputContainer}>
            <TextInput style={styles.inputBox}
                placeholder="student number" underlineColorAndroid='transparent' placeholderTextColor='#cc0000'/>
            <TextInput style={styles.inputBox}
                placeholder="password" underlineColorAndroid='transparent' placeholderTextColor='#cc0000'/>
            <TouchableHighlight style={styles.loginBtn}
                onPress={() => this.props.navigation.navigate('Feed')}>
                <Text style={styles.socialText}>
                        LOGIN
                </Text>
            </TouchableHighlight>
                
        </View>


        <View style={styles.socialContainer}>
            <TouchableHighlight style={styles.socialBtn}
                onPress={this._onPressButton}>
                    <Text style={styles.socialText}>
                        Continue with facebook
                    </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.socialBtn}
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
    logo: {
        flex: 1,
        width: 300,
        height: 250,
    },
    titleContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    inputContainer: {
        flex: 1,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 20,
    },
    inputBox: {
        flex: 1,
        marginRight:20,
        alignItems: 'center',
        marginLeft:20,
        color: '#cc0000',
        marginTop:5,
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:'#d9d9d6',
        borderRadius:10,
        borderWidth: 1,
        textAlign: 'center',
    },

    loginBtn: {
        flex: 1,
        marginRight:20,
        alignItems: 'center',
        marginLeft:20,
        marginTop:5,
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:'#cc0000',
        borderRadius:10,
        borderWidth: 1,
    },

    socialContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 20,
    },
    socialBtn: {
        flex: 1,
        marginRight:20,
        alignItems: 'center',
        marginLeft:20,
        marginTop:5,
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:'#cc0000',
        borderRadius:10,
        borderWidth: 1,
    },
    socialView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialImage: {
        width: 20,
        height: 20,
    },
    socialText: {
        color: '#ffffff',
        fontSize: 20,
    },
});