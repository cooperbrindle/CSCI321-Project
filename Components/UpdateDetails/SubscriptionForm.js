/////////////////////////////////////////
// PROMOTIONAL SUBSCRIPTIONS PREFERENCES PAGE
////////////////////////////////////////

import React, { Component } from 'react';
import { ScrollView, View, Switch, Text} from 'react-native';
import { DefaultButton } from '../CustomProps/DefaultButton';

//styles
import { styles } from '../styles/FormStyles';
import { udStyles } from '../styles/udStyles';
import { navigationOptionsFunc } from '../styles/navOptions';

import { CustSwitch } from '../CustomProps/CustSwitch';


export default class SubscriptionForm extends Component {
	
	//Nav header
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
	

	

	//////////////////////////////////////////////////////////////////////
	render() {
		return (
			
			<View style={styles.container}>
			<ScrollView>
				
				<CustSwitch text='Allow promotional material to be sent' value={this.state.promotionsValue} onValueChange={(v) => this.setState({promotionsValue: v})} />
				<CustSwitch text='Recieve Outlook Magazine (Quarterly)' value={this.state.outlookValue} onValueChange={(v) => this.setState({outlookValue: v})} />
				
				<View style={{margin:20}} />

				<CustSwitch text='Allow communication via post' value={this.state.postValue} onValueChange={(v) => this.setState({postValue: v})} />
				<CustSwitch text='Allow communication via mobile' value={this.state.mobileValue} onValueChange={(v) => this.setState({mobileValue: v})} />
				<CustSwitch text='Allow communication via email' value={this.state.emailValue} onValueChange={(v) => this.setState({emailValue: v})} />


			</ScrollView>
				<View style={styles.submitBtnCont}>
                    <DefaultButton title='Save' nav={() => this.saveChanges()} />
                    <DefaultButton title='Discard' nav={() => this.props.navigation.goBack()} />
                </View>

         	</View>
		);
		}
	};

