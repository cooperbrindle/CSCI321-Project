

import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Alert, AsyncStorage, Modal, TextInput, Dimensions} from 'react-native';
import { DefaultButton } from '../CustomProps/DefaultButton';
import { DashButton } from '../CustomProps/DashButton';
import { SocialButton } from '../CustomProps/SocialButton';
import { baseStyles } from '../styles/BaseStyles';
import { styles } from '../styles/FormStyles';
import { udStyles } from '../styles/udStyles';
import { navigationOptionsFunc } from '../styles/navOptions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinkedInModal from 'react-native-linkedin';
import { linkedInConfig } from '../socialConfig';

const accountIcon = require('../assets/Account.png');
const contactIcon = require('../assets/Contact.png');
const employmentIcon = require('../assets/Employment.png');
const subscripIcon = require('../assets/Subscriptions.png');

export default class UpdateDetailsMenu extends Component {
	
	static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Update Details', navigation, false);
	}

	state = {
		vultr: this.props.screenProps,
		isLoading: false,
		didLoad: false,
		errorMessage: '',
		successMessage: '',
		showLinkedIn: false,
		password: '',
		modalVisible: true,
	};
	
	
	componentWillMount(){
	}

	load(){
		try{
			var vultr = this.props.screenProps;
			if(this.state.password == ''){
				this.setState({errorMessage: 'Please enter password'});
				return;
			}
			this.setState({vultr: this.props.screenProps, modalVisible: false});
			vultr.loadConstituent(this.state.password)
			.then(() => {
				const originalData = JSON.parse(JSON.stringify(vultr.data)); //duplicate
				this.setState({
					originalData: originalData,
					data: vultr.data,
					constituentRefID: vultr.data.id,
					isLoading: false,
					didLoad: true,
					modalVisible: false,
					password: '',
					errorMessage: '',
				});

			}).catch((err) => {
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
		this.setState({errorMessage: '', isLoading: true});
		try{
			var vultr = this.props.screenProps;
			vultr.updateDetails(this.state.data)
			.then(() => {
				this.setState({errorMessage: '',
					successMessage: '',
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
					successMessage: '',
					isLoading: false
				});
			})
		}catch(err){console.warn('catch error: '+ err.message);}
	}


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
		}).then((result) => {
			console.log(result);
			this.setState({
				isLoading: false,
				didLoad: true,
			});
			//this.replaceData(result);
		}).catch((error) => {
			console.log('ERROR: ' + error);
			this.setState({
				isLoading: false,
				didLoad: true,
				errorMessage: error,
			});
		})
	}

	replaceData(result){
		var data = this.state.data;
		data.firstName = result.firstName;
		data.lastName = result.lastName;
		data.email = result.emailAddress;
		data.linkedIn = result.publicProfileUrl;
		data.maidenName = result.maidenName;
		data.orgName = result.positions.values[0].company.name;
		data.position = result.positions.values[0].title;

		//TODO: SHOW WHICH FIELDS WERE UPDATED
		Alert.alert(
			'Success!',
			'Successfully updated profile from linkedIn',
			[
				{text: 'OK', onPress: () => {}},
			],
			{ cancelable: false }
		);
	}

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
	

	renderLoading(){
		if(this.state.isLoading)
			return (<ActivityIndicator size='large' color='#cc0000'/>);
		else return (<View/>);
	}

	renderMessages(){
		if(this.state.errorMessage != ''){
			return(
				<Text style={baseStyles.errorText}>
					{this.state.errorMessage}
				</Text>
			);
		}
		else if(this.state.successMessage != ''){
			return(
				<View style={udStyles.SuccessView}>
					<Text style={udStyles.successText}>
						{this.state.successMessage}
					</Text>
				</View>
			);
		}
		else return (<View/>);
	}

	renderDashBoard(){
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
                    <SocialButton title='Import from' liOnClick={() => {this.modal.open()}} />
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
	
	
