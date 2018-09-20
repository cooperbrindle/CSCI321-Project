import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';


const fbLogo = require('../assets/fblogo.png');
const liLogo = require('../assets/lilogo.png');
export class SocialButton extends React.Component{

    render() {
        return(
            <View>
            <TouchableHighlight style={styles.socialBtnFB}
                onPress={this.props.fbOnClick}>
                <View style={styles.socialBtnView}>
                    <Image
                        style={styles.socialImage}
                        source={fbLogo}
                    />

                    <Text style={styles.socialText}>
                        {this.props.title + ' facebook'}
                    </Text>
                </View>
            </TouchableHighlight>


            <TouchableHighlight style={styles.socialBtnLI}
                onPress={this.props.liOnClick}>
                <View style={styles.socialBtnView}>
                    <Image
                        style={styles.socialImage}
                        source={liLogo}
                    />

                    <Text style={styles.socialText}>
                        {this.props.title + ' Linkedin'}
                    </Text>
                </View>
            </TouchableHighlight>
            </View>
        )
    }
};

const styles = StyleSheet.create({
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