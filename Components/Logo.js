import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';


const uowLogo = './assets/logo.png';
var imgHeight = 72;
var imgWidth = 180;
var textSize = 22;

export class Logo {
    Logo(scale){
        textSize = textSize * scale;
        imgHeight = imgHeight * scale;
        imgWidth = imgWidth * scale;
    }
    renderLogo = () => {
        return(
            <View style={styles.logoCont}>
                <Image
                    resizeMode='center'
                    resizeMethod='resize'
                    source={require(uowLogo)}
                    style={{
                        width: imgWidth,
                        height: imgHeight,
                        flexDirection: 'row',
                        alignSelf: 'center',
                    }}
                />
                <View style={styles.banner}>
                        <Text style={{fontSize: textSize,
                                    color: '#0C2340',
                                    fontWeight: 'bold',}}>
                            ALUMNI
                        </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    logoCont: {
        marginTop: 50,
        flex: 2,
    },
    banner: {
        marginTop: 8,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: 'white',
        margin: 0,
        justifyContent: 'center',
        padding: 10,
        paddingBottom: 20,
        flexDirection: 'row',
    },
});