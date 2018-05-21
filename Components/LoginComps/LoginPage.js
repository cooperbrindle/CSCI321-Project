

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, View, Image} from 'react-native'; 
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
                style={{width: 300, height: 200}}
                source={require('/Users/cooperbrindle/OneDrive - University of Wollongong/UOW ComSci/CSIT321/CSCI321-Project/assets/AlumniLogoOffical.png')}
            />
        </View>
        <View style={styles.inputContainer}>
            <TextInput style={styles.inputBox}
                placeholder="student number"/>
            <TextInput style={styles.inputBox}
                placeholder="password"/>
            <Button style={styles.loginBtn}
                title="Login"
                onPress={() => this.props.navigation.navigate('Feed')}/>
        </View>
        <View style={styles.socialContainer}>
            <Image
                style={{width: 66, height: 58}}
                source={{uri: 'https://en.facebookbrand.com/wp-content/uploads/2016/05/flogo_rgb_hex-brc-site-250.png'}}
            />
            <Image
                style={{width: 66, height: 58}}
                source={{uri: '/Users/cooperbrindle/OneDrive - University of Wollongong/UOW ComSci/CSIT321/CSCI321-Project/assets/In-2C-CMYK-0p5in-R.png'}}
            />
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
    titleContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    inputContainer: {
        flex: 2,
    },
    socialContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    Title1: {
        fontSize: 40,
        margin: 0,
        textAlign: 'center',
        color: 'white',
        /*fontStyle: 'Chronicle Display Roman'*/
    },
    Title2: {
        margin: 0,
        fontSize: 20,
        textAlign: 'center',
        color: '#cc0000',
        /*fontStyle: 'Chronicle Display Roman'*/
    },
    inputBox: {
        backgroundColor: '#ffffff',
        textAlign: 'left',
        marginBottom: 5,
    },
    loginBtn: {
        marginBottom: 5,
    },
    socialBtn: {
        flex: 1,
    }
});