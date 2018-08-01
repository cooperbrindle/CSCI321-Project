

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, FlatList, View, TouchableHighlight, Image} from 'react-native';
import { DefaultButton } from './DefaultButton';
import { DashButton } from './DashButton';
import { SocialButton } from './SocialButton';

import firebase from 'firebase';
import firestore from 'firebase/firestore';

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
	// 
	
	componentWillMount(){
		try{
		this.props.firebase = this.props.screenProps;
		let db = this.props.firebase.firestore();
		db.settings({timestampsInSnapshots: true});



		const uid = this.props.firebase.auth().currentUser.uid;
		
		//TODO: check collection names

		//get constitID from UserLink Collection

		console.warn('uid: ' + uid);

		db.collection('UserLinks')
			.doc(uid)
			.get()
			.then(userlink => {
				if(userlink.exists){
					//get all data related to constitID
					console.warn('userlink constitID: ' + userlink.data().constitID);
					db.collection('Constituent')
						.where('constituentID', '==', userlink.data().constitID)
						.get()
						.then(doc => {
							if(doc.exists){
								
								const originalData = JSON.parse(JSON.stringify(doc))
								this.setState({originalData: originalData, data: doc});

							}else{ this.handleDBErrors();}
						}).catch(error => { this.handleDBErrors(error);})

				}else{ this.handleDBErrors();}
			}).catch(error => { this.handleDBErrors(error);})
		

		}catch(err){console.warn('try catch error: ' + err.message);}
		/*data = {
			title: 'Mr',
			firstName: 'Daniel',
			lastName: 'McK',
			day: '11',
			month: '11',
			year: '96',
			stdNum: '1234567',
			email: 'email@gmail.com',
			emailOther: 'noOther@nothing.com',
			mobile: '0435879645',
			address: 'somewhere',
			city: 'Wollongong',
		};*/
		
	}

	handleDBErrors(error){
		if(error == null)
			console.warn('if else error');
		else console.warn(error.message)
	}

	
	//	Method to navigate to form and pass data
	//	 will pass the entire structure and each page can just pick out what it needs essentialls
	navigateToForm(formName){
		
		this.props.navigation.navigate(formName, {data: this.state.data});
	}

	discardChanges(){
		const newData = JSON.parse(JSON.stringify(this.state.originalData));
		this.setState({data: newData});
	}

	saveChanges(){

	}




	render() {
		return (
			<View style={styles.container}>
				
				<View style={styles.dashboard}>
					<DashButton title='Account' img={dashTmp} nav={()=>this.props.navigation.navigate('AccForm', {data: this.state.data})} />
					<DashButton title='Contact' img={dashTmp} nav={()=>this.props.navigation.navigate('ContForm', {data: this.state.data})} />
				</View>

				<View style={styles.dashboard}>
					<DashButton title='Employment' img={dashTmp} nav={()=>this.props.navigation.navigate('EmpForm', {data: this.state.data})} />
					<DashButton title='Subscriptions' img={dashTmp} nav={()=>this.props.navigation.navigate('SubForm', {data: this.state.data})} />
				</View>

                <View style={styles.socialContainer}>
                    <SocialButton title='Import from' nav={{}} />
                </View>

                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Save Changes' nav={() => this.props.navigation.navigate('UDMenu')} />
                    <DefaultButton title='Discard Changes' nav={() => this.discardChanges()} />   
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
