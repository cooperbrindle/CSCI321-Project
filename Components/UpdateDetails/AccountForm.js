

import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, TextInput, View, TouchableHighlight, Image} from 'react-native';
import { styles } from '../styles/FormStyles';
import { DefaultButton } from '../CustomProps/DefaultButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { navigationOptionsFunc } from '../styles/navOptions';

export default class AccountForm extends Component {
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
            title: data.title,
            firstName: data.firstName,
            lastName: data.lastName,
            day: data.birthDate.substr(0,2),
            month: data.birthDate.substr(3,2),
            year: data.birthDate.substr(6,4),
            stdNum: data.stdNum
        });
    }

    saveChanges(){
        if(!this.validateData())
            return;

        let data = this.props.navigation.getParam('data', 'NoData');
        try{
            data.title = this.state.title;
            data.firstName = this.state.firstName;
            data.lastName = this.state.lastName;
            data.birthDate = this.state.day + '/' + this.state.month + '/' + this.state.year;
            data.stdNum = this.state.stdNum;
        }catch(err){
            console.warn('ERROR: '+ err.message);
        }
        this.props.navigation.goBack();
    }

    validateData(){
        this.setState({errorMessage: ''});
        ////////////////Empty Input validation
        if(this.state.title == '' || this.state.firstName == '' ||
        this.state.lastName == '' || this.state.day == '' ||
        this.state.month == '' || this.state.year == '' ||
        this.state.stdNum == ''){
            this.setState({errorMessage: 'Empty Input'});
            return false;
        }
        return true;
    }
    //
    /////////////////////////////////////
    //TODO: make uneditale fields slightly different colour
    
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

	render() {
		return (
			<View style={styles.container}>
            <KeyboardAwareScrollView>
            <ScrollView>
				<Text style={styles.title}>
                    Account Info
                </Text>
                <View style={styles.topInput}>
                    <View style={styles.inputContSmall}>
                        <Text style={styles.inputText}>
                            Title
                        </Text>
                        <TextInput style={styles.inputBoxSmall}
                            placeholder='' underlineColorAndroid='transparent' placeholderTextColor='grey'
                            onChangeText={(t) => this.setState({title:t})}
                            value={this.state.title} />
                    </View>
                    
                    <View style={styles.inputContDate}>
                        <Text style={styles.inputText}>
                            DD
                        </Text>
                        <TextInput style={styles.inputBoxDate}
                            placeholder='' underlineColorAndroid='transparent' placeholderTextColor='grey'
                            onChangeText={(d) => this.setState({day:d})}
                            value={this.state.day} editable={false} />
                    </View>
                    <View style={styles.inputContDate}>
                        <Text style={styles.inputText}>
                            MM
                        </Text>
                        <TextInput style={styles.inputBoxDate}
                            placeholder='' underlineColorAndroid='transparent' placeholderTextColor='grey'
                            onChangeText={(m) => this.setState({month:m})}
                            value={this.state.month} editable={false}/>
                    </View>
                    <View style={styles.inputContYear}>
                        <Text style={styles.inputText}>
                            YYYY
                        </Text>
                        <TextInput style={styles.inputBoxDate}
                            placeholder='' underlineColorAndroid='transparent' placeholderTextColor='grey'
                            onChangeText={(y) => this.setState({year:y})}
                            value={this.state.year} editable={false}/>
                    </View>
                    
                </View>

                {this.renderInput('First Name', '', (a) => this.setState({firstName:a}), this.state.firstName, true)}
                {this.renderInput('Last Name', '', (a) => this.setState({lastName:a}), this.state.lastName, true)}
                {this.renderInput('Student Number', '', (a) => this.setState({stdNum:a}), this.state.stdNum, false)}
				
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