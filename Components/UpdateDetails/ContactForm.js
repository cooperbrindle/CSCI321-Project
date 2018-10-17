/////////////////////////////////////////
// CONSTACT DETAILS FORM PAGE
////////////////////////////////////////

import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, TextInput, View, TouchableHighlight, Image} from 'react-native';
import { styles } from '../styles/FormStyles';
import { DefaultButton } from '../CustomProps/DefaultButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { navigationOptionsFunc } from '../styles/navOptions';

export default class ContactForm extends Component {
    static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Update Details', navigation, false);
	}

    //Load data passed to page
    componentWillMount(){
        const data = this.props.navigation.getParam('data', 'NoData');
        if(data == 'NoData'){
            console.error('NO DATA PASSED TO CONTACT FORM PAGE');
            this.props.navigation.goBack();
        }
        this.setState({
            errorMessage: '',
            email: data.email,
            emailOther: data.emailOther,
            mobile: data.mobile,
            address: data.address,
            city: data.city
        });
    }

    //save button press handler
    saveChanges(){
        if(!this.validateData())
            return;

        let data = this.props.navigation.getParam('data', 'NoData');
        try{
            data.email = this.state.email;
            data.emailOther = this.state.emailOther;
            data.mobile = this.state.mobile;
            data.address = this.state.address;
            data.city = this.state.city;
        }catch(err){
            console.warn('ERROR: '+ err.message);
        }
        this.props.navigation.goBack();
    }

    //check all data conforms
    validateData(){
        //TODO: email validation

        //empty inputs
        if(this.state.email == '' || this.state.emailOther == '' ||
        this.state.mobile == '' || this.state.address == '' || this.state.city == ''){
            this.setState({errorMessage: 'Empty Fields'});
            return false;
        }
        //Check mobile has no alpha characters
        if(/[a-z]/i.test(this.state.mobile)){
            this.setState({errorMessage: 'Invalid Mobile'});
            return false;
        }
        return true;
    }
	
	
	renderInput(title, ph, onChangeT, v, keyboardType){
        if(!keyboardType) keyboardType = 'default';
		return(
			<View style={styles.inputCont}>
                <Text style={styles.inputText}>
                    {title}
                </Text>
                <TextInput style={styles.inputBox}
                    placeholder={ph} underlineColorAndroid='transparent' placeholderTextColor='grey'
                    onChangeText={onChangeT} keyboardType={keyboardType}
                    value={v} />
            </View>
		)
	}

	render() {
		return (
            <View style={styles.container}>
            <KeyboardAwareScrollView >
            
				<Text style={styles.title}>
                    Contact Info
                </Text>

				{this.renderInput('email (preferred)', 'js@uowmail.edu.au', (a) => this.setState({email:a}), this.state.email, 'email-address')}
				{this.renderInput('Other email', '', (a) => this.setState({emailOther:a}), this.state.emailOther, 'email-address')}
                {this.renderInput('Mobile', '0441234567', (a) => this.setState({mobile:a}), this.state.mobile, 'numeric')}
                {this.renderInput('Address', 'This field will be expanded out in the future', (a) => this.setState({address:a}), this.state.address)}
                {this.renderInput('City', 'Wollongong', (a) => this.setState({city:a}), this.state.city)}
				
            
            </KeyboardAwareScrollView>
                <View style={styles.submitBtnCont}>
					<DefaultButton title='Save' nav={() => this.saveChanges()} />
                    <DefaultButton title='Discard' nav={() => this.props.navigation.goBack()} />
                </View>
			</View>
		);
		}
	};
