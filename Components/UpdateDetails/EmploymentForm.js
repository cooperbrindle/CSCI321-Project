/////////////////////////////////////////
// EMPLOYMENT DETAILS FORM PAGE
////////////////////////////////////////

import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, TextInput, View, TouchableHighlight, Image} from 'react-native';

//custom props
import { FormInput } from '../CustomProps/FormInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DefaultButton } from '../CustomProps/DefaultButton';

//styles
import { styles } from '../styles/FormStyles';
import { navigationOptionsFunc } from '../styles/navOptions';

export default class EmploymentForm extends Component {
    
    //Nav header
    static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Update Details', navigation, false);
	}

	//Load data passed to page
    componentWillMount(){
        const data = this.props.navigation.getParam('data', 'NoData');
        if(data == 'NoData'){
            console.error('NO DATA PASSED TO EMPLOYMENT FORM PAGE');
            this.props.navigation.goBack();
        }
        this.setState({
            errorMessage: '',
            position: data.position,
            orgName: data.orgName,
        });
    }

    //Save button press handler
	saveChanges(){
        let data = this.props.navigation.getParam('data', 'NoData');
        try{
            data.position = this.state.position;
            data.orgName = this.state.orgName;
        }catch(err){
            console.warn('ERROR: '+ err.message);
        }
        this.props.navigation.goBack();
	}
    

    //MAIN RENDER
	render() {
		return (
			<View style={styles.container}>
            <KeyboardAwareScrollView>
				<Text style={styles.title}>
                    Employment Details
                </Text>

				<FormInput title='Job Title' onChangeText={(a) => this.setState({position:a})} value={this.state.position} />
                <FormInput title='Employer' onChangeText={(a) => this.setState({orgName:a})} value={this.state.orgName} />
            
            </KeyboardAwareScrollView>
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Save' nav={() => this.saveChanges()} />
                    <DefaultButton title='Discard' nav={() => this.props.navigation.goBack()} />
                </View>
			</View>
		);
	}
};