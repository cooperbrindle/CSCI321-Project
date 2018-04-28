

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, View} from 'react-native'; 


export default class Login extends Component {

    loginPress() {
        this.props.navigation.navigate('Feed')
    };

  render() {
    return (
      <View style={styles.container}>
        <view style={styles.titleContainer}>
            <Text style={styles.Title1}>
                UOW
            </Text>
            <Text style={styles.Title2}>
                Alumni
            </Text>
        </view>
        <view style={styles.inputContainer}>
            <TextInput style={styles.inputBox}
                placeholder="student number"/>
            <TextInput style={styles.inputBox}
                placeholder="password"/>
            <Button style={styles.loginBtn}
                title="Login"
                onPress={this.loginPress}/>
        </view>
        <view style={styles.socialContainer}>
            <Button style={styles.socialBtn}
                title="Google"
                onPress={{}}/>
            <Button style={styles.socialBtn}
                title="Facebook"
                onPress={{}}/>
            <Button style={styles.socialBtn}
                title="LinkedIn"
                onPress={{}}/>
        </view>
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