

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
                style={{width: 300, height: 200, paddingBottom: 50,}}
                source={require('./AlumniLogoOffical.png')}
            />
        </View>


        <View style={styles.inputContainer}>
            <TextInput style={styles.inputBox}
                placeholder="student number" underlineColorAndroid='transparent'/>
            <TextInput style={styles.inputBox}
                placeholder="password"/>
            <Button style={styles.loginBtn}
                title="Login"
                onPress={() => this.props.navigation.navigate('Feed')}/>
        </View>


        <View style={styles.socialContainer}>
            <TouchableHighlight style={styles.socialBtn}
                onPress={this._onPressButton}>
                <View style={styles.socialView}>
                    <Image
                        style={styles.socialImage}
                        source={require('./AlumniLogoOffical.png')}
                    />
                    <Text style={styles.socialText}>
                        Continue with facebook
                    </Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.socialBtn}
                onPress={this._onPressButton}>
                <View style={styles.socialView}>
                    <Image
                        style={styles.socialImage}
                        source={require('./AlumniLogoOffical.png')}
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
        marginBottom: 5,
    },
    inputBox: {
        backgroundColor: '#d9d9d6',
        color: '#cc0000',
        textAlign: 'center',
        marginBottom: 5,
    },
    loginBtn: {
        marginBottom: 5,
    },

    socialContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 100,
    },
    socialBtn: {
        flex: 1,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 5,
        backgroundColor: '#cc0000',
    },
    socialView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialImage: {
        width: 66,
        height: 58,
    },
    socialText: {
        color: '#ffffff',
        fontSize: 20,
    },
});