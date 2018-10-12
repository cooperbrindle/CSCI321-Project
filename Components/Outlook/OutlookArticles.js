
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, WebView, ActivityIndicator} from 'react-native';


export default class OutlookArticles extends Component {
	
	static navigationOptions = {
		title: 'UOW Outlook Magazine',
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
		const data = this.props.navigation.getParam('data', 'NoData');
        if(data == 'NoData'){
            console.error('NO DATA PASSED TO Article Viewer');
            this.props.navigation.goBack();
        }
        this.setState({
            errorMessage: '',
            link: data,
        });
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
                    source={{uri: this.state.link}}
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
