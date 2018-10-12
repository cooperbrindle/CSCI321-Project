

import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, TextInput, View, TouchableHighlight, Image, Switch} from 'react-native';
import { styles } from '../styles/FormStyles';
import { DefaultButton } from '../CustomProps/DefaultButton';
import { SettingsSwitch } from 'react-native-settings-components';
import { navigationOptionsFunc } from '../styles/navOptions';

export default class SubscriptionForm extends Component {
	static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Update Details', navigation, false);
	}
	
	/////////////////////////////////////
    //
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
    //
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

	render() {
		return (
			<View style={styles.container}>
			<ScrollView>
			<View>
				<SettingsSwitch
					title={'Allow communication via post'}
					onSaveValue={(value) => {
						console.log('Allow communication via post:', value);
						this.setState({
							postValue: value
						});
						}}
						value={this.state.postValue}
						thumbTintColor={(this.state.postValue) ? colors.switchEnabled : colors.switchDisabled}
				/>
				<SettingsSwitch
					title={'Allow communication via text'}
					onSaveValue={(value) => {
						console.log('Allow communication via text:', value);
						this.setState({
							mobileValue: value
						});
						}}
						value={this.state.mobileValue}
						thumbTintColor={(this.state.mobileValue) ? colors.switchEnabled : colors.switchDisabled}
				/>
				<SettingsSwitch
					title={'Allow communication via email'}
					onSaveValue={(value) => {
						console.log('Allow communication via email:', value);
						this.setState({
							emailValue: value
						});
						}}
						value={this.state.emailValue}
						thumbTintColor={(this.state.emailValue) ? colors.switchEnabled : colors.switchDisabled}
				/>
				<SettingsSwitch style={styles.inputCont}
					title={'Allow promotional material to be sent'}
					onSaveValue={(value) => {
						console.log('Allow promotional material to be sent:', value);
						this.setState({
							promotionsValue: value
						});
						}}
						value={this.state.promotionsValue}
						thumbTintColor={(this.state.promotionsValue) ? colors.switchEnabled : colors.switchDisabled}
				/>
				<SettingsSwitch
					title={'Recieve Outlook Magazine (Quarterly)'}
					onSaveValue={(value) => {
						console.log('Recieve Outlook Magazine (Quarterly)', value);
						this.setState({
							outlookValue: value
						});
						}}
						value={this.state.outlookValue}
						thumbTintColor={(this.state.outlookValue) ? colors.switchEnabled : colors.switchDisabled}
				/>
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

	const colors = {
		iosSettingsBackground: '#0C2340',
		white: '#0C2340',
		monza: '#C70039',
		switchEnabled: (Platform.OS === 'android') ? '#CC0000' : null,
		switchDisabled: (Platform.OS === 'android') ? '#D9D9D6' : null,
		switchOnTintColor: (Platform.OS === 'android') ? 'rgba(199, 0, 57, 0.6)' : null,
		blueGem: '#27139A',
	  };