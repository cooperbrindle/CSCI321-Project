

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, FlatList, View, TouchableHighlight, Image} from 'react-native';
import { DefaultButton } from './DefaultButton';
import { DashButton } from './DashButton';
import { SocialButton } from './SocialButton';

const dashTmp = require('./assets/dashTmp.png');

export default class UpdateDetailsMenu extends Component {
	
	static navigationOptions = {
		title: 'Update Details',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	}

	///////////////////////////////////////////////////////////////////
	//
	// New Code
	/*
	componentWillMount(){
		const changedDataTmp = [];
		const dataTmp = {
            firstName: '',
            lastName: '',
            DOB: '',
            stdNum: '',
			email: '',
			//TODO: request all this info from user object and from database
		};
		
		this.setState({data: dataTmp, changedData: changedDataTmp});
	}
	*/
	//
	////////////////////////////////////////////////////////////////////
	//
	//	Method to navigate to form and pass data
	//	 will pass the entire structure and each page can just pick out what it needs essentialls
	navigateToForm(formName){
		//navigate using passed in form name and add the two datastructures to the nav props
		//THEN: change all DashButtons nav={...} to nav={() this.navigateToForm('pageName')} I think
	}


	render() {
		return (
			<View style={styles.container}>
				
				<View style={styles.dashboard}>
					<DashButton title='Account' img={dashTmp} nav={()=>this.props.navigation.navigate('AccForm')} />
					<DashButton title='Contact' img={dashTmp} nav={()=>this.props.navigation.navigate('ContForm')} />
				</View>

				<View style={styles.dashboard}>
					<DashButton title='Employment' img={dashTmp} nav={()=>this.props.navigation.navigate('EmpForm')} />
					<DashButton title='Subscriptions' img={dashTmp} nav={()=>this.props.navigation.navigate('SubForm')} />
				</View>

                <View style={styles.socialContainer}>
                    <SocialButton title='Import from' nav={{}} />
                </View>

                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Save Changes' nav={() => this.props.navigation.navigate('UDMenu')} />
                    <DefaultButton title='Discard Changes' nav={() => this.props.navigation.navigate('UDMenu')} />   
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

		/////////////////////////////////////////DASH BOARD
		dashboard: {
			flex: 1,
			flexDirection: 'row',
			marginLeft: 7,
			marginRight: 7,
			justifyContent: 'space-between',
		},

		/////////////////////////////////////////SOCIAL STYLES
        socialContainer: {
            flex: 1,
            marginBottom: 30,
            marginLeft: 5,
            marginRight: 5,
            justifyContent: 'center',
        },

        /////////////////////////////////////////SUBMIT BUTTONS
        submitBtnCont: {
            flex: 1,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 10,
            alignContent: 'flex-start',
            justifyContent: 'flex-end',
        },
	});
