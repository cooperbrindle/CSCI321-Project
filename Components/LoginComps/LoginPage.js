

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, View} from 'react-native'; 


export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <view style={styles.titleContainer}>
            <Text style={styles.Title}>
                UOW Alumni
            </Text>
        </view>
        <view style={styles.inputContainer}>
            <TextInput style={styles.inputBox}
                placeholder="student number"/>
            <TextInput style={styles.inputBox}
                placeholder="password"/>
            <Button style={styles.loginBtn}
                title="Login"
                onPress={{}}/>
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
    Title: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        color: 'white',
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