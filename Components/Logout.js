import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator} from 'react-native'; 
import { baseStyles } from './styles/BaseStyles';

export default class Logout extends Component {
	
	static navigationOptions = {
		title: 'Logout',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
			
		},
	}

	state = {
		vultr: this.props.screenProps,
	};
	
	
	componentDidMount(){
		var vultr = this.props.screenProps;
		
        vultr.logout();
        this.props.navigation.navigate('Login');
	}



	render() {

		return (
			<View style={styles.container}>
                <View style={baseStyles.activityView}>
                    <ActivityIndicator size='large' color='#cc0000'/>
                </View>
            </View>
		);
		}
	};
	
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#0C2340',
		},

    });