import React, { Component } from 'react';
import { TouchableHighlight, Image } from 'react-native';

const settingsIcon = require('../assets/Settings.png');

exports.navigationOptionsFunc = (title, navigation, isSettings) => {
    var headerRight;
    if(isSettings){
        headerRight = (
			<TouchableHighlight 
				onPress={navigation.getParam('toggleSettings')}
			>
				<Image source={settingsIcon}
					style={{resizeMode: 'contain', width: 40, height: 40 }}
				/>
			</TouchableHighlight>	
		)
    }
    return {
        title: title,
        headerStyle: {
            backgroundColor: '#0C2340',
        },
        headerTintColor: 'white',
        headerRight: headerRight,
    }
}