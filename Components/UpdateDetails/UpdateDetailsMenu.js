

import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Alert} from 'react-native';
import { DefaultButton } from '../CustomProps/DefaultButton';
import { DashButton } from '../CustomProps/DashButton';
import { SocialButton } from '../CustomProps/SocialButton';
import { baseStyles } from '../styles/BaseStyles';
import { styles } from '../styles/FormStyles';
import { udStyles } from '../styles/udStyles';

const accountIcon = require('../assets/Account.png');
const contactIcon = require('../assets/Contact.png');
const employmentIcon = require('../assets/Employment.png');
const subscripIcon = require('../assets/Subscriptions.png');

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

	state = {
		vultr: this.props.screenProps,
		isLoading: true,
		didLoad: false,
		errorMessage: '',
		successMessage: '',
	};
	
	
	componentWillMount(){
		try{
		
		var vultr = this.props.screenProps;
		this.setState({vultr: this.props.screenProps});
		vultr.loadConstituent()
		.then(() => {
			const originalData = JSON.parse(JSON.stringify(vultr.data)); //duplicate
			this.setState({
				originalData: originalData,
				data: vultr.data,
				constituentRefID: vultr.data.id,
				isLoading: false,
				didLoad: true,
			});

		}).catch((err) => {
			this.setState({
				isLoading: false,
				didLoad: false,
			});
		})


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
		if(this.state.didLoad)
			return(
				<View style={udStyles.container}>
				<View style={udStyles.dashboard}>
					<DashButton title='Account' img={accountIcon} nav={()=>this.props.navigation.navigate('AccForm', {data: this.state.data})} />
					<DashButton title='Contact' img={contactIcon} nav={()=>this.props.navigation.navigate('ContForm', {data: this.state.data})} />
				</View>

				<View style={udStyles.dashboard}>
					<DashButton title='Employment' img={employmentIcon} nav={()=>this.props.navigation.navigate('EmpForm', {data: this.state.data})} />
					<DashButton title='Subscriptions' img={subscripIcon} nav={()=>this.props.navigation.navigate('SubForm', {data: this.state.data})} />
				</View>

                <View style={udStyles.socialContainer}>
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
	
	
