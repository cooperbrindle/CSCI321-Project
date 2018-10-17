/////////////////////////////////////////
// Update Details Menu Page
//
// - loads constituent details from backend
// 	and passes data to each form page for editing
// - submits changes
// - imports data and autofills from LinkedIn
// - facebook not implemented yet. not enough data to make feasible 
/////////////////////////////////////////

import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Alert, TextInput } from 'react-native';

//styles
import { baseStyles } from '../styles/BaseStyles';
import { styles } from '../styles/FormStyles';
import { udStyles } from '../styles/udStyles';
import { navigationOptionsFunc } from '../styles/navOptions';

//custom props
import LinkedInModal from 'react-native-linkedin';
import { SocialButton } from '../CustomProps/SocialButton';
import { DefaultButton } from '../CustomProps/DefaultButton';
import { DashButton } from '../CustomProps/DashButton';
import { linkedInConfig } from '../socialConfig';

//Dash button icons
const accountIcon = require('../assets/Account.png');
const contactIcon = require('../assets/Contact.png');
const employmentIcon = require('../assets/Employment.png');
const subscripIcon = require('../assets/Subscriptions.png');

export default class UpdateDetailsMenu extends Component {
	
	//nav header
	static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Update Details', navigation, false);
	}

	state = {
		vultr: this.props.screenProps,
		isLoading: false,
		didLoad: false,
		errorMessage: '',
		showLinkedIn: false,
		password: 'password',
		modalVisible: true,
	};
	
	
	componentWillMount(){
	}

	//Load constituent data
	load(){
		try{
			var vultr = this.props.screenProps;
			if(this.state.password == ''){ //empty password
				this.setState({errorMessage: 'Please enter password'});
				return;
			}

			//Load data
			this.setState({vultr: this.props.screenProps, modalVisible: false});
			vultr.loadConstituent(this.state.password)
			.then(() => {
				const originalData = JSON.parse(JSON.stringify(vultr.data)); //duplicate, used for discarding changes
				this.setState({
					originalData: originalData, 
					data: vultr.data,
					isLoading: false,
					didLoad: true,
					modalVisible: false,
					password: '',
					errorMessage: '',
				});

			}).catch((err) => { //Data did not load / incorrect password
				this.setState({
					isLoading: false,
					didLoad: false,
					errorMessage: err,
				});
				console.log(err);
				if(err == 'Incorrect password') 
					this.setState({modalVisible: true, password: ''})
			})
		}catch(err){console.warn('try catch error: ' + err.message);}
	}

	//	Method to navigate to form and pass data
	navigateToForm(formName){
		if(!this.state.isLoading)
			this.props.navigation.navigate(formName, {data: this.state.data});
	}

	//discard all changes made (Locally)
	discardChanges(){
		const newData = JSON.parse(JSON.stringify(this.state.originalData));
		this.setState({data: newData});
	}

	//Save changes back to server
	saveChanges(){
		this.setState({errorMessage: '', isLoading: true});
		try{
			var vultr = this.props.screenProps;
			vultr.updateDetails(this.state.data)
			.then(() => {
				this.setState({errorMessage: '',
					isLoading: false
				});
				Alert.alert(
					'Success!',
					'Successfully updated',
					[
						{text: 'OK', onPress: () => this.props.navigation.navigate('HomePage')},
					],
					{ cancelable: false }
				)
			}).catch(() => {
				this.setState({errorMessage: 'Error updating details',
					isLoading: false
				});
			})
		}catch(err){console.warn('catch error: '+ err.message);}
	}

	//Fetch LinkedIn user data from LinkedIn API
	async loadLinkedInUser(accessToken){
		this.setState({
			isLoading: true,
			didLoad: false,
			errorMessage: '',
		});

		data = fetch(linkedInConfig.baseAPI + ':(' + linkedInConfig.params.join(',') + ')?format=json', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + accessToken.access_token,
			},
		}).then((result) => {
			if(!result.ok) throw('SERVER ERROR');
			else return(result.json());
		}).then((result) => { //Data did load
			console.log(result);
			this.setState({
				isLoading: false,
				didLoad: true,
			});
			this.replaceData(result);	
		}).catch((error) => {	//data did not load
			console.log('ERROR: ' + error);
			this.setState({
				isLoading: false,
				didLoad: true,
				errorMessage: error,
			});
		})
	}

	//replace new data from Linkedin data
	replaceData(result){
		var data = this.state.data;
		var str = '';
		//All if's used to reduce text shown in Alert prop
		if(data.firstName != result.firstName){
			data.firstName = result.firstName;
			str += 'First Name: ' + result.firstName + '\n';
		}
		if(data.lastName != result.lastName){
			data.lastName = result.lastName;
			str += 'Last Name: ' + result.lastName + '\n';
		}
		if(data.email != result.emailAddress){
			data.email = result.emailAddress;
			str += 'Email: ' + result.emailAddress + '\n';
		}
		if(result.maidenName && result.maidenName != '' && result.maidenName != null 
			&& data.maidenName != result.maidenName){
			data.maidenName = result.maidenName;
			str += 'Maiden Name: ' + result.maidenName + '\n';
		}
		if(data.orgName != result.positions.values[0].company.name){
			data.orgName = result.positions.values[0].company.name;
			str += 'orgName: ' + result.positions.values[0].company.name + '\n';
		}
		if(data.position != result.positions.values[0].title){
			data.position = result.positions.values[0].title;
			str += 'Position: ' + result.positions.values[0].title + '\n';
		}
		data.linkedIn = result.publicProfileUrl;

		Alert.alert(
			'Success!',
			str,
			[
				{text: 'OK', onPress: () => {}},
			],
			{ cancelable: false }
		);
	}

	//Show LinkedIn Sign in modal Web view
	// SOURCE: https://github.com/xcarpentier/react-native-linkedin
    renderLinkedInModal() {
        return (
            <LinkedInModal
                ref={ref => {
                    this.modal = ref
				}}
				linkText=''
                clientID={linkedInConfig.clientID}
                clientSecret={linkedInConfig.clientSecret}
                redirectUri={linkedInConfig.redirectUri}
                onSuccess={accessToken => this.loadLinkedInUser(accessToken)}
            />
        );
	}

	//Import with facebook press handler
	facebookImport(){
		Alert.alert(
			'Sorry!',
			'This feature will be coming soon :(\nTry Linkedin instead',
			[
				{text: 'OK', onPress: () => {}},
			],
			{ cancelable: false }
		);
	}
	
	//Activity indicator
	renderLoading(){
		if(this.state.isLoading)
			return (<ActivityIndicator size='large' color='#cc0000'/>);
		else return (<View/>);
	}

	//render error messages
	renderMessages(){
		if(this.state.errorMessage != ''){
			return(
				<Text style={baseStyles.errorText}>
					{this.state.errorMessage}
				</Text>
			);
		}
		else return (<View/>);
	}

	//dashboard menu buttons or password overlay
	renderDashBoard(){

		//SHOW PASSWORD INPUT OVERLAY IF VISABLE=TRUE
		if(this.state.modalVisible){ 
			return(
				<View style={baseStyles.container}>
					<Text style={styles.title}>
						Enter Password
					</Text>

					<View style={styles.inputCont}>
						<Text style={styles.inputText}>
							Password
						</Text>
						<TextInput style={styles.inputBox}
							underlineColorAndroid='transparent' placeholderTextColor='grey'
							onChangeText={(a) => this.setState({password: a})}
							value={this.state.password} secureTextEntry={true} autoCapitalize='none'/> 
					</View>
					<DefaultButton title='Submit' nav={() => this.load()} />
				</View>
			);
		
		//ELSE SHOW DASHBOARD MENU WHEN DATA LOADS
		}else if(this.state.didLoad)
			return(
				<View style={baseStyles.container}>
				
				<View style={udStyles.dashboard}>
					<DashButton title='Account' img={accountIcon} nav={()=>this.props.navigation.navigate('AccForm', {data: this.state.data})} />
					<DashButton title='Contact' img={contactIcon} nav={()=>this.props.navigation.navigate('ContForm', {data: this.state.data})} />
				</View>

				<View style={udStyles.dashboard}>
					<DashButton title='Employment' img={employmentIcon} nav={()=>this.props.navigation.navigate('EmpForm', {data: this.state.data})} />
					<DashButton title='Subscriptions' img={subscripIcon} nav={()=>this.props.navigation.navigate('SubForm', {data: this.state.data})} />
				</View>

                <View style={udStyles.socialContainer}>
                    <SocialButton title='Import from' liOnClick={() => {this.modal.open()}} fbOnClick={() => {this.facebookImport()}}/>
                </View>
				{this.renderLinkedInModal()}

                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Save Changes' nav={() => this.saveChanges()} />
                    <DefaultButton title='Discard Changes' nav={() => this.discardChanges()} />   
                </View>
				</View>
			);
		else return(<View/>);
	}

	//MAIN RENDER
	render() {
		return (
			<View style={baseStyles.container}>
				{this.renderMessages()}
				<View style={baseStyles.activityView}>
					{this.renderLoading()}
				</View>
				{this.renderDashBoard()}
			</View>
		);
		}
};
	
	
