import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, WebView, ActivityIndicator, TouchableHighlight, Image} from 'react-native';

const settingsIcon = require('../assets/Settings.png');

export default class FAQs extends Component {
	
	static navigationOptions = ({navigation}) => {
		return {
		title: 'Frequently Asked Questions',
		headerStyle: {
			backgroundColor: '#0C2340',
			
		},
		headerTintColor: 'white',
		headerRight: (
			<TouchableHighlight 
				onPress={navigation.getParam('toggleSettings')}
			>
				<Image source={settingsIcon}
					style={{resizeMode: 'contain', width: 40, height: 40 }}
				/>
			</TouchableHighlight>	
		),
	}};//width: 40, height: 40

	toggleSettings = () => {
		this.props.navigation.toggleDrawer();;
	}

	componentWillMount(){
		this.setState({isLoading: true});
		this.props.navigation.setParams({toggleSettings: this.toggleSettings})
		
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
                    source={{uri: 'https://www.uow.edu.au/alumni/faqs/index.html'}}
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
