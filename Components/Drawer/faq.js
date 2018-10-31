/////////////////////////////////////////
// FREQUENTLY ASKED QUESTIONS
////////////////////////////////////////

import React, { Component } from 'react';
import { StyleSheet, View, WebView, ActivityIndicator } from 'react-native';
import { navigationOptionsFunc } from '../styles/navOptions';

export default class FAQs extends Component {
	
	static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('FAQs', navigation, true);
	}

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
