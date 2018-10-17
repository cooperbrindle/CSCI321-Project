/////////////////////////////////////////
// EMPLOYMENT DETAILS FORM PAGE
////////////////////////////////////////

import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, TextInput, View, TouchableHighlight, Image} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//styles
import { styles } from '../styles/FormStyles';
import { DefaultButton } from '../CustomProps/DefaultButton';
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
    
    //Input box and input title
	renderInput(title, ph, onChangeT, v, edita){
		return(
			<View style={styles.inputCont}>
                <Text style={styles.inputText}>
                    {title}
                </Text>
                <TextInput style={styles.inputBox}
                    placeholder={ph} underlineColorAndroid='transparent' placeholderTextColor='grey'
                    onChangeText={onChangeT}
                    value={v} editable = {edita}/>
            </View>
		)
	}

    //MAIN RENDER
	render() {
		return (
			<View style={styles.container}>
            <KeyboardAwareScrollView>
            <ScrollView>
				<Text style={styles.title}>
                    Employment Info
                </Text>
                {this.renderInput('Job Title', '', (a) => this.setState({position:a}), this.state.position, true)}
                {this.renderInput('Employer', '', (a) => this.setState({orgName:a}), this.state.orgName, true)}
				
            </ScrollView>
            </KeyboardAwareScrollView>
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Save' nav={() => this.saveChanges()} />
                    <DefaultButton title='Discard' nav={() => this.props.navigation.goBack()} />
                </View>
			</View>
		);
	}
};