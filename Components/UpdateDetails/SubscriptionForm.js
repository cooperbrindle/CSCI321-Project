

import React, { Component } from 'react';
import { ScrollView, View, Switch, Text} from 'react-native';
import { styles } from '../styles/FormStyles';
import { udStyles } from '../styles/udStyles';
import { DefaultButton } from '../CustomProps/DefaultButton';
import { navigationOptionsFunc } from '../styles/navOptions';


export default class SubscriptionForm extends Component {
	static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Update Details', navigation, false);
	}
	
	/////////////////////////////////////
    //Load data
    componentWillMount(){
        const data = this.props.navigation.getParam('data', 'NoData');
        if(data == 'NoData'){
            console.error('NO DATA PASSED TO ACCOUNT FORM PAGE');
            this.props.navigation.goBack();
		}
        this.setState({
            errorMessage: '',
			postValue: (data.postSub == "true"),
			mobileValue: (data.mobileSub == "true"),
			emailValue: (data.emailSub == "true"),
			promotionsValue: (data.promotions == "true"),
			outlookValue: (data.outlook == "true"),
		});
    }
    //Save Changes to Switches
	/////////////////////////////////////
	saveChanges(){

        let data = this.props.navigation.getParam('data', 'NoData');
        try{
            data.postSub = '' + (this.state.postValue == true) + '';
            data.mobileSub = '' + (this.state.mobileValue == true) + '';
            data.emailSub = '' + (this.state.emailValue == true) + '';
			data.promotions = '' + (this.state.promotionsValue == true) + '';
			data.outlook = '' + (this.state.outlookValue == true) + '';
        }catch(err){
            console.warn('ERROR: '+ err.message);
        }
        this.props.navigation.goBack();
	}
	//When switch value changes
	////////////////////////////////////////////////////////////////////
	videoKilledTheRadioStar(value, type){
		if(type=='post'){
			this.setState({
				postValue: value
			});
		}
		if(type=='mobile'){
			this.setState({
				mobileValue: value
			});
		}
		if(type=='email'){
			this.setState({
				emailValue: value
			});
		}
	}
	//
	//////////////////////////////////////////////////////////////////////
	render() {
		return (
			
			<View style={styles.container}>
			<ScrollView>
				<View style={udStyles.switchView}>
					<View style={udStyles.textSwitch}>
						<Text style={udStyles.switchText}>
							Allow communication via post
						</Text>
					</View>
					<Switch
						disabled = {false}
						value = {this.state.postValue}
						onValueChange ={(value) => {this.videoKilledTheRadioStar(value, 'post')}}/>
				</View>
				<View style={udStyles.switchView}>
					<View style={udStyles.textSwitch}>
						<Text style={udStyles.switchText}>
							Allow communication via mobile
						</Text>
					</View>
					<Switch
						disabled = {false}
						value = {this.state.mobileValue}
						onValueChange ={(value) => {this.videoKilledTheRadioStar(value, 'mobile')}}/>
				</View>
				<View style={udStyles.switchView}>
					<View style={udStyles.textSwitch}>
						<Text style={udStyles.switchText}>
							Allow communication via email
						</Text>
					</View>
					<Switch
						disabled = {false}
						value = {this.state.emailValue}
						onValueChange ={(value) => {this.videoKilledTheRadioStar(value, 'email')}}/>
				</View>
				<View style={udStyles.switchView}>
					<View style={udStyles.textSwitch}>
						<Text style={udStyles.switchText}>
							Allow promotional material to be sent
						</Text>
					</View>
					<Switch
						disabled = {false}
						value = {this.state.promotionsValue}
						onValueChange ={(value) => {this.setState({promotionsValue: value})}}/>
				</View>
				<View style={udStyles.switchView}>
					<View style={udStyles.textSwitch}>
						<Text style={udStyles.switchText}>
							Recieve Outlook Magazine (Quarterly)
						</Text>
					</View>
					<Switch
						disabled = {false}
						value = {this.state.outlookValue}
						onValueChange ={(value) => {this.setState({outlookValue: value})}}/>
				</View>
			</ScrollView>
				<View style={styles.submitBtnCont}>
                    <DefaultButton title='Save' nav={() => this.saveChanges()} />
                    <DefaultButton title='Discard' nav={() => this.props.navigation.goBack()} />
                </View>

         	</View>
		);
		}
	};

