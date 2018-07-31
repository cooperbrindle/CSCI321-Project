

import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, TextInput, View, TouchableHighlight, Image} from 'react-native';
import { styles } from './FormStyles';
import { DefaultButton } from './DefaultButton';


export default class ContactForm extends Component {
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

	/////////////////////////////////////
    //
    componentWillMount(){
        const data = this.props.navigation.getParam('data', 'NoData');
        if(data == 'NoData'){
            console.error('NO DATA PASSED TO CONTACT FORM PAGE');
            this.props.navigation.goBack();
        }
        this.state = {
            email: data.email,
            emailOther: data.emailOther,
            mobile: data.mobile,
            address: data.address,
            city: data.city
        };
    }

    saveChanges(){
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
    //
    /////////////////////////////////////
	
	
	renderInput(title, ph, onChangeT, v){
		return(
			<View style={styles.inputCont}>
                <Text style={styles.inputText}>
                    {title}
                </Text>
                <TextInput style={styles.inputBox}
                    placeholder={ph} underlineColorAndroid='transparent' placeholderTextColor='grey'
                    onChangeText={onChangeT}
                    value={v} />
            </View>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>
                    Contact Info
                </Text>
                <ScrollView>

				{this.renderInput('email (preferred)', 'js@uowmail.edu.au', (a) => this.setState({email:a}), this.state.email)}
				{this.renderInput('Other email', '', (a) => this.setState({emailOther:a}), this.state.emailOther)}
                {this.renderInput('Mobile', '0441234567', (a) => this.setState({mobile:a}), this.state.mobile)}
                {this.renderInput('Address', 'This field will be expanded out in the future', (a) => this.setState({address:a}), this.state.address)}
                {this.renderInput('City', 'Wollongong', (a) => this.setState({city:a}), this.state.city)}
				
                </ScrollView>
                <View style={styles.submitBtnCont}>
					<DefaultButton title='Save' nav={() => this.saveChanges()} />
                    <DefaultButton title='Discard' nav={() => this.props.navigation.goBack()} />
                </View>
			</View>
		);
		}
	};
