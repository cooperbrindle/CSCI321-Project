/////////////////////////////////////////
// CUSTOM MENU BUTTON
// Used for the dashboad menu style
////////////////////////////////////////

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';

export class DashButton extends React.Component{

    render() {
        return(
            <TouchableHighlight style={styles.dashBtn}
                    onPress={this.props.nav}>
                <View style={styles.dashBtnContainer}>
                    <Image
                        style={styles.dashBtnImg}
                        source={this.props.img}
                    />
                    <Text style={styles.dashText}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    dashBtn: {
        flex: 1,
        margin: 5,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 2,
    },
    dashBtnContainer: {
        justifyContent: 'center',
        alignContent: 'center',
    },
        dashBtnImg: {
            width: 45,
            height: 45,
            alignSelf: 'center',
        },
        dashText: {
            //fontFamily: 'Verdana',
            color: '#0C2340',
            fontSize: 18,
            textAlign: 'center',
            alignSelf: 'center',
        },
});