

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, FlatList, View, TouchableHighlight, Image, ActivityIndicator} from 'react-native';
import { DefaultButton } from './DefaultButton';
import { DashButton } from './DashButton';
import { SocialButton } from './SocialButton';

import firebase from 'firebase';
import firestore from 'firebase/firestore';

const dashTmp = require('./assets/dashTmp.png');
const accountIcon = require('./assets/Account.png');
const contactIcon = require('./assets/Contact.png');
const employmentIcon = require('./assets/Employment.png');
const subscripIcon = require('./assets/Subscriptions.png');

export default class UpdateDetailsMenu extends Component {
	
	static navigationOptions = {
		title: 'Update Details',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
			
		},
	}

	///////////////////////////////////////////////////////////////////
	//
	// 
	
	componentWillMount(){
		try{
		
		this.state = {
			firebase: this.props.screenProps,
			isLoading: true,
			didLoad: false,
			errorMessage: '',
			successMessage: '',
			firebase: this.props.screenProps,
		};
		
		let db = this.props.screenProps.firestore();
		db.settings({timestampsInSnapshots: true});
		const uid = this.props.screenProps.auth().currentUser.uid;
		
		//get constitID from UserLink Collection
		db.collection('UserLinks').doc(uid).get()
			.then(userlink => {
				if(userlink.exists){
					//get all data related to constitID
					db.collection('Constituent')
						.where('constituentID', '==', userlink.data().constituentID).get()
						.then(doc => {
							doc.forEach(constituent => {
								if(constituent.exists){
									console.warn('Constituent Data Loaded');
									const originalData = JSON.parse(JSON.stringify(constituent.data()))
									this.setState({originalData: originalData,
										data: constituent.data(),
										constituentRefID: constituent.id,
										isLoading: false,
										didLoad: true,
									});

								}else{this.handleDBErrors();}
							});
						}).catch(error => { this.handleDBErrors(error);})

				}else{ this.handleDBErrors();}
			}).catch(error => { this.handleDBErrors(error);})
		
		}catch(err){console.warn('try catch error: ' + err.message);}
		
	}

	handleDBErrors(error){
		this.setState({isLoading: false});
		if(error == null)
			console.warn('if else error');
		else console.warn(error.message)
	}

	
	//	Method to navigate to form and pass data
	//	 will pass the entire structure and each page can just pick out what it needs essentialls
	navigateToForm(formName){
		if(!this.state.isLoading)
			this.props.navigation.navigate(formName, {data: this.state.data});
	}

	discardChanges(){
		const newData = JSON.parse(JSON.stringify(this.state.originalData));
		this.setState({data: newData});
	}

	saveChanges(){
		this.setState({errorMessage: ''});
		try{
			let db = this.state.firebase.firestore();
			db.settings({timestampsInSnapshots: true});
			
			db.collection('Constituent').doc(this.state.constituentRefID)
			.update(
				this.state.data
			).then(() => {
				//TODO: show sucessful update
				console.warn('successfully updated');
			}).catch((error) => {
				this.setState({errorMessage: 'Error updating details'});
				console.warn(error.message);
			});

			if(this.state.data.email != this.state.originalData.email){
				this.state.firebase.auth().currentUser.updateEmail(this.state.data.email)
				.then(() => {
					console.warn('successfully updates User email');
				}).catch(error => {
					this.setState({errorMessage: 'Error updating details'});
					console.warn(error.message)
				});
			}
		}catch(err){console.warn('catch error: '+ err.message);}
	}


	renderLoading(){
		if(this.state.isLoading)
			return (
				<ActivityIndicator size='large' color='#cc0000'/>
			);
		else return (
			<View/>
		);
	}

	renderMessages(){
		if(this.state.errorMessage != ''){
			return(
				<View style={styles.errorView}>
					<Text style={styles.errorText}>
						{this.state.errorMessage}
					</Text>
				</View>
			);
		}
		else if(this.state.successMessage != ''){
			return(
				<View style={styles.SuccessView}>
					<Text style={styles.successText}>
						{this.state.successMessage}
					</Text>
				</View>
			);
		}
		else return (<View/>);
	}

	renderDashBoard(){
		if(this.state.didLoad)
			return(
				<View style={styles.container}>
				<View style={styles.dashboard}>
					<DashButton title='Account' img={accountIcon} nav={()=>this.props.navigation.navigate('AccForm', {data: this.state.data})} />
					<DashButton title='Contact' img={contactIcon} nav={()=>this.props.navigation.navigate('ContForm', {data: this.state.data})} />
				</View>

				<View style={styles.dashboard}>
					<DashButton title='Employment' img={employmentIcon} nav={()=>this.props.navigation.navigate('EmpForm', {data: this.state.data})} />
					<DashButton title='Subscriptions' img={subscripIcon} nav={()=>this.props.navigation.navigate('SubForm', {data: this.state.data})} />
				</View>

                <View style={styles.socialContainer}>
                    <SocialButton title='Import from' nav={{}} />
                </View>

                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Save Changes' nav={() => this.saveChanges()} />
                    <DefaultButton title='Discard Changes' nav={() => this.discardChanges()} />   
                </View>
				</View>
			);
		else return(
			<View/>
		);
	}

	render() {

		return (
			<View style={styles.container}>
				{this.renderMessages()}
				{this.renderLoading()}
				{this.renderDashBoard()}

			</View>
		);
		}
	};
	
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#0C2340',
		},

		errorView: {
			backgroundColor: 'red',
		},

		errorText: {
			color: 'white',
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
