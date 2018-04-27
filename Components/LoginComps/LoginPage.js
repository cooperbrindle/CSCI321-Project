

import React, { Component } from 'react';
import {Platform, StyleSheet, Text, TextInput, Button, View} from 'react-native'; 

type Props = {} ;

export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.Title}>
          UOW Alumni
        </Text>
        <TextInput style={styles.inputBox}
            placeholder="student number"/>
        <TextInput style={styles.inputBox}
            placeholder="password"/>
        <Button style={styles.loginBtn}
            title="Login"
            onPress={}/>
        <Button style={styles.socialBtn}
            title="Google"
            onPress={}/>
        <Button style={styles.socialBtn}
            title="Facebook"
            onPress={}/>
        <Button style={styles.socialBtn}
            title="LinkedIn"
            onPress={}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  Title: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  inputBox: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
  },
  loginBtn: {

  },
  socialBtn: {

  }
});
