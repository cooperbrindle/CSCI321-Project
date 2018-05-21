

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, 
    TextInput, Button, View, Image, TouchableOpacity} from 'react-native'; 
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
            <TouchableOpacity style={styles.socialBtn}
                onPress={this._onPressButton}>
                <Image
                    style={styles.button}
                    source={require('/Users/cooperbrindle/OneDrive - University of Wollongong/UOW ComSci/CSIT321/CSCI321-Project/assets/AlumniLogoOffical.png')}
                />
                <Text style={styles.socialText}>
                    Continue with facebook
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}
                onPress={this._onPressButton}>
                <Image
                    style={styles.button}
                    source={require('/Users/cooperbrindle/OneDrive - University of Wollongong/UOW ComSci/CSIT321/CSCI321-Project/assets/AlumniLogoOffical.png')}
                />
                <Text style={styles.socialText}>
                    Continue with Linkedin
                </Text>
            </TouchableOpacity>
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
    inputBox: {
        backgroundColor: '#ffffff',
        textAlign: 'left',
        marginBottom: 5,
    },
    loginBtn: {
        marginBottom: 5,
    },

    socialContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    socialBtn: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        backgroundColor: '#ffffff'
    },
    socailImage: {
        width: 66,
        height: 58,
    },
});