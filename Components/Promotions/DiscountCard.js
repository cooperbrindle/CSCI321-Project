

import React, { Component } from 'react';
import { ImageBackground, Text} from 'react-native';


export default class DiscountCard extends Component {
	constructor(props){
        super(props);
    }
    
	static navigationOptions = {
        title: 'Discount Card',
		headerStyle: {
            backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
            
        },
    }
	render() {
		return (
            <ImageBackground source={require('../assets/uow.jpg')} style={{width: '100%', height: '100%'}}>
              <Text>Waiting on Client</Text>
            </ImageBackground>
          );
		}
};