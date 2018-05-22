

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
                <View style={styles.socialBtnView}>
                    <Image
                        style={styles.socialImage}
                        source={require('./fblogo.png')}
                    />

                    <Text style={styles.socialText}>
                        Continue with facebook
                    </Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.socialBtnLI}
                onPress={this._onPressButton}>
                <View style={styles.socialBtnView}>
                    <Image
                        style={styles.socialImage}
                        source={require('./linkedinlogo.png')}
                    />
                    
                    <Text style={styles.socialText}>
                        Continue with Linkedin
                    </Text>
                </View>
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
        marginTop: 50,
        flex: 2,
    },
    logo: {
        width: 180,
        height: 72,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    banner: {
        marginTop: 8,
        backgroundColor: 'white',
        margin: 0,
        justifyContent: 'center',
        padding: 10,
        paddingBottom: 20,
        flexDirection: 'row',
    },
    bannerText: {
        fontSize: 22,
        color: '#0C2340',
        fontWeight: 'bold',
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
    loginBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:5,
        backgroundColor:'#0C2340',
        height: 50,
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
        height: 50,
        backgroundColor:'#3B5998',
        borderRadius:10,
        borderWidth: 1,
        justifyContent: 'center',
    },
    socialBtnLI: {
        height: 50,
        backgroundColor:'#0077B5',
        borderRadius:10,
        borderWidth: 1,
        justifyContent: 'center',
    },
    socialBtnView: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        //justifyContent: 'center',
    },
    socialImage: {
        position: 'absolute',
        marginLeft: 10,
        marginTop: 10,
        width: 30,
        height: 30,
        margin: 0,
        alignSelf: 'flex-start',
    },
    socialText: {
        flex: 1,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },
});