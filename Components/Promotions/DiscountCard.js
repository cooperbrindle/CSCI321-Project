

import React, { Component } from 'react';
import { ImageBackground, Text} from 'react-native';
import { navigationOptionsFunc } from '../styles/navOptions';

export default class DiscountCard extends Component {
	constructor(props){
        super(props);
    }
    
	static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Discount Card', navigation, false);
	}
	render() {
		return (
            <ImageBackground source={require('../assets/uow.jpg')} style={{width: '100%', height: '100%'}}>
              <Text>Waiting on Client</Text>
            </ImageBackground>
          );
		}
};