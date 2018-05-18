

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, View, TouchableOpacity} from 'react-native'; 


export default class Login extends Component {

    loginPress() {
        this.props.navigation.navigate('Feed')
    };

  render() {
    return (
      <View style={styles.container}>
        

        
        <View style={styles.inputContainer}>
            <TextInput style={styles.inputBox}
                        placeholder="username"/>
            <TextInput style={styles.inputBox}
                        placeholder="password"/>
            <Button style={styles.loginBtn}
                title="Login"
                onPress={this.loginPress}/>
        </View>


        <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialBtn}
                        onPress={{}}>
                <Text style={styles.socialText} > facebook </Text>
                <Text style={styles.socialText} > Linkedin </Text>
            </TouchableOpacity>
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
    /////////////////////////////// Main Styles
    container: {
        flex: 1,
        backgroundColor: '#0C2340',
    },
    logoContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    /////////////////////////////// Input Stlyes
    inputContainer: {
        flex: 3,
        MarginLeft: 5,
        MarginRight: 5,
    },
    inputBox: {
        backgroundColor: '#d9d9d6',
        textAlign: 'left',
        marginBottom: 0,
    },
    loginBtn: {
        marginTop: 5,
        borderRadius:10,
        borderWidth: 2,
        borderColor: 'white'
    },

    /////////////////////////////// Social Login Styles
    socialContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    socialBtn: {
        flex: 1,
        marginLeft: 5,
        marginTop: 2,
        marginBottom: 2,
    },
    socialImage: {

    },
    socialText: {
        color: 'white',
        fontSize: 8,
    }
});