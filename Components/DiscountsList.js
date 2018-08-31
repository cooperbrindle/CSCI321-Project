

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, FlatList, View, TouchableHighlight, Image, ActivityIndicator} from 'react-native';

import { EventSingle } from './EventSingle';
import { DashButton } from './DashButton';
import { Logo } from './discLogo';



export default class Discounts extends Component {
	constructor(props){
        super(props);
        state = {
            isLoading: true,
            errorMessage: '',
        }
	}
	static navigationOptions = {
		title: 'Discounts',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
			
		},
    }
    
    componentDidMount(){ 
        Vultrsdk.getDiscounts('UOW')
        .then((res) => {
            this.setState({data: res, isLoading: false, errorMessage: ''});

        }).catch((error) => {
            this.setState({isLoading: false, errorMessage: error.message});
        })
        
    }

    renderActivityIndicator(){
        return this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View/>;
    }

    renderItem(item){
        return(
            <View style={styles.itemView}>
                 
            </View>
        )
    }
    renderList(){
        if(data == null)
            return <View/>;
        
        return(
            <ScrollView style={styles.scrollView}>
                
            </ScrollView>
        )
    }
	render() {
		return (
			<View style={styles.container}>
				
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