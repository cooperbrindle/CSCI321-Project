

import React, { Component } from 'react';
import { StyleSheet, View, WebView, ActivityIndicator} from 'react-native';


export default class Mentoring extends Component {
	
	static navigationOptions = {
		title: 'Mentor Opportunities',
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
                    source={{uri: 'https://www.uow.edu.au/alumni/benefits/mentoring/index.html'}}
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