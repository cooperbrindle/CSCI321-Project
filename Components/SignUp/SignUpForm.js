

import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View, Alert, ActivityIndicator} from 'react-native';
import { styles } from '../styles/FormStyles';
import { DefaultButton } from '../CustomProps/DefaultButton';
import { baseStyles } from '../styles/BaseStyles';

import { navigationOptionsFunc } from '../styles/navOptions';

export default class SignUpForm extends Component {

    static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Sign Up', navigation, false);
	}

    state = {
        errorMessage: '',
        isLoading: false,
        firstName: '',
        lastName: '',
        stdNum: '',
        email: '',
        day: '',
        month: '',
        year: '',
    };

    componentDidMount(){
        this.vultr = this.props.screenProps;
    }

    handleSubmitResult(result){
        
         this.props.navigation.navigate('Conditions', {
            email: result.email,
            id: result.id,
        });
    }
    
    submitForm() {
        this.setState({isLoading: true, errorMessage: ''});
        
        
        //Create JSON data from form
        var data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            stdNum: this.state.stdNum,
            email: this.state.email,
            birthDate: this.state.day + '/' + this.state.month + '/' + this.state.year,
        };
        if(data.birthDate == '//') data.birthDate = '';
        if(data.firstName == '' && data.lastName == '' && data.stdNum == ''
        && data.email == '' && data.birthDate == ''){
            this.setState({errorMessage: 'No fields entered', isLoading: false});
            return;
        }
        //send data to cloud function here
        this.vultr.submitSignUp(data)
            .then((result) => {
                this.setState({isLoading: false, errorMessage: ''});
                this.handleSubmitResult(result);
            
            }).catch(error => {
                if(error == 'Already a user' || error == 'Too many users'){
                    this.setState({isLoading: false});
                    var msg = '';
                    if(error == 'Already a user')
                        msg = 'A user already exists with these details'
                    else if(error == 'Too many users')
                        msg = 'Too many users have been found, please try refining your search ' +
                            'or contact the Alumni Relations Team via alumni@uowmail.edu.au';
                    Alert.alert(
                        'Oops!',
                        msg,
                        [
                            {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
                        ],
                        { cancelable: false }
                    )
                }
                else this.setState({isLoading: false, errorMessage: error});
            });
    }

	renderInput(title, ph, stateValue){
		return(
			<View style={styles.inputCont}>
                <Text style={styles.inputText}>
                    {title}
                </Text>
                <TextInput style={styles.inputBox}
                    placeholder={ph} underlineColorAndroid='transparent' placeholderTextColor='grey'
                    onChangeText={stateValue}/>
            </View>
		)
	}

	render() {

        const actInd = this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View/>;
		return (
			<View style={styles.container}>
                <View style={stylesA.topPadding}/>
				<Text style={styles.title}>
                    Please fill out as many fields as possible
                </Text>

                <Text style={baseStyles.errorText}>
                    {this.state.errorMessage}
                </Text>

                <View style={baseStyles.activityView}>
                    {actInd}
                </View>

                <ScrollView>
                <View style={styles.topInput}>
                    
                    <View style={styles.inputContDate}>
                        <Text style={styles.inputText}>
                            DD
                        </Text>
                        <TextInput style={styles.inputBoxDate}
                            placeholder={this.state.day} onChangeText={(t) => this.setState({day:t})} 
                            underlineColorAndroid='transparent' placeholderTextColor='grey'/>
                    </View>
                    <View style={styles.inputContDate}>
                        <Text style={styles.inputText}>
                            MM
                        </Text>
                        <TextInput style={styles.inputBoxDate}
                            placeholder={this.state.month} onChangeText={(t) => this.setState({month:t})} 
                            underlineColorAndroid='transparent' placeholderTextColor='grey'/>
                    </View>
                    <View style={styles.inputContYear}>
                        <Text style={styles.inputText}>
                            YYYY
                        </Text>
                        <TextInput style={styles.inputBoxDate}
                            placeholder={this.state.year} onChangeText={(t) => this.setState({year:t})} 
                            underlineColorAndroid='transparent' placeholderTextColor='grey'/>
                    </View>
                    
                </View>

                {this.renderInput('First Name', '',     (value) => this.setState({firstName: value}) )}
                {this.renderInput('Last Name', '',      (value) => this.setState({lastName: value}) )}
                {this.renderInput('Student Number', '', (value) => this.setState({stdNum: value}) )}
                {this.renderInput('UOW email', '',      (value) => this.setState({email: value}) )}
				
                </ScrollView>
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Continue' nav={() => this.submitForm()} />
                    {/*<DefaultButton title='Back' nav={() => this.props.navigation.navigate('Login')} />*/}
                </View>
			</View>
		);
		}
    };
    
    const stylesA = StyleSheet.create({
       
        topPadding: {
            flex: 0.1,
        },
    });