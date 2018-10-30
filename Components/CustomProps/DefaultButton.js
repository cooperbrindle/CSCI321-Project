/////////////////////////////////////////
// CUSTOM FORM BUTTON
// mostly used for form submitions
////////////////////////////////////////

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export class DefaultButton extends React.Component{

    render() {
        return(
            <TouchableHighlight style={styles.loginBtn}
                onPress={this.props.nav}>
                <Text style={styles.loginText}>
                    {this.props.title}
                </Text>
            </TouchableHighlight>
        )
    }
};

const styles = StyleSheet.create({
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
        fontFamily: 'Verdana',
        color: '#cc0000',
    },
});