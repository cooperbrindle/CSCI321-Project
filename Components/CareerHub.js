

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, WebView, ActivityIndicator} from 'react-native';


export default class CareerHub extends Component {
	
	static navigationOptions = {
		title: 'CareerHub',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	}

	componentWillMount(){
        this.setState({isLoading: true});
		
    }
    
    pageDidLoad(){
        this.setState({isLoading: false});
    }

	render() {
        const actInd = this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View/>;
		return (
			<View style={styles.container}>
                {actInd}
				<WebView
                    source={{uri: 'https://careerhub.uow.edu.au/students/login?ReturnUrl=%2f'}}
                    style={styles.webStyle}
                    onLoadEnd={() => this.pageDidLoad()}
                />

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
