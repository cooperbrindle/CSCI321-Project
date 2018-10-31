/////////////////////////////////////////
// CONSTACT DETAILS FORM PAGE
////////////////////////////////////////

import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, TextInput, View, TouchableHighlight, Image} from 'react-native';
import { styles } from '../styles/FormStyles';
import { navigationOptionsFunc } from '../styles/navOptions';

//custom props
import { FormInput } from '../CustomProps/FormInput';
import { DefaultButton } from '../CustomProps/DefaultButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
            city: data.city,
            state: data.state,
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
            data.state = this.state.state;
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
	

	render() {
		return (
            <View style={styles.container}>
            <KeyboardAwareScrollView >
            
				<Text style={styles.title}>
                    Contact Info
                </Text>
				
                <FormInput title='email (preferred)' onChangeText={(a) => this.setState({email:a})} 
                    value={this.state.email} keyboardType='email-address' autoCapitalize='none'/>
                <FormInput title='email (other)' onChangeText={(a) => this.setState({emailOther:a})} 
                    value={this.state.emailOther} keyboardType='email-address' autoCapitalize='none'/>
                <FormInput title='Mobile' onChangeText={(a) => this.setState({mobile:a})} value={this.state.mobile} keyboardType='numeric'/>
                <FormInput title='Address' onChangeText={(a) => this.setState({address:a})} value={this.state.address} />
                <FormInput title='City' onChangeText={(a) => this.setState({city:a})} value={this.state.city} />
                <FormInput title='State' onChangeText={(a) => this.setState({state:a})} value={this.state.state} />
            
            </KeyboardAwareScrollView>
                <View style={styles.submitBtnCont}>
					<DefaultButton title='Save' nav={() => this.saveChanges()} />
                    <DefaultButton title='Discard' nav={() => this.props.navigation.goBack()} />
                </View>
			</View>
		);
		}
	};
