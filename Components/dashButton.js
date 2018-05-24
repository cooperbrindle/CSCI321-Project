

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';


const dashTmp = './assets/dashTmp.png';
export class DashButton {
 renderDashBtn = (title, nav, dir) => {
		return(
			<TouchableHighlight style={styles.dashBtn}
					onPress={() => nav.navigate(dir)}>
				<View style={styles.dashBtnContainer}>
					<Image
                        style={styles.dashBtnImg}
                        source={require(dashTmp)}
                    />
					<Text style={styles.dashText}>
						{title}
					</Text>
				</View>
            </TouchableHighlight>
		)
	}
}

const styles = StyleSheet.create({
		
    /////////////////////////////////////////DASH BOARD
    dashboard: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 7,
        marginRight: 7,
        justifyContent: 'space-between',
    },
            dashBtn: {
                flex: 1,
                margin: 5,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignContent: 'center',
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
                        color: '#0C2340',
                        fontSize: 18,
                        textAlign: 'center',
                        alignSelf: 'center',
                    },
});