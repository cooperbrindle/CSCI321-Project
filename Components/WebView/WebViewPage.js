/////////////////////////////////////////
// Web View Page
/////////////////////////////////////////
import React, { Component } from 'react';
import { View, WebView, ActivityIndicator} from 'react-native';
import { baseStyles } from '../styles/BaseStyles';

export default class WebViewPage extends Component {
	
	static navigationOptions = ({navigation}) => {
		return{
			title: navigation.state.params.title,
			headerStyle: {
				backgroundColor: '#0C2340',
			},
			headerTintColor: 'white',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		}
	}


	componentWillMount(){
		this.setState({isLoading: true, link: this.props.navigation.getParam('link', '')});		
    }
    
    pageDidLoad(){
        this.setState({isLoading: false});
    }

	render() {
        const actInd = this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View/>;
		return (
			<View style={baseStyles.container}>
                {actInd}
				<WebView
                    source={{uri: this.state.link}}
                    onLoadEnd={() => this.pageDidLoad()}
                />

			</View>
		);
		}
	};
	
