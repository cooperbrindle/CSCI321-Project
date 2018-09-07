import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';


var imgHeight = 72;
var imgWidth = 180;
var textSize = 22;

export class Logo extends React.Component{

    constructor(props){
        super(props);
        textSize *= props.scale;
        imgHeight *= props.scale;
        imgWidth *= props.scale;
    }
    render() {
        return(
            <View>
                <Image
                    resizeMode='center'
                    resizeMethod='resize'
                    source={require('./assets/logo.png')}
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
                            ALUMNI DISCOUNTS
                        </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

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