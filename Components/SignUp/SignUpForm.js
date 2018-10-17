

import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View, Alert, ActivityIndicator} from 'react-native';

//custom props
import { FormInput } from '../CustomProps/FormInput';
import { DefaultButton } from '../CustomProps/DefaultButton';
import { baseStyles } from '../styles/BaseStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//styles
import { styles } from '../styles/FormStyles';
import { navigationOptionsFunc } from '../styles/navOptions';

export default class SignUpForm extends Component {

    //Nav header
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

    //When database finds match
    handleSubmitResult(result){
        this.props.navigation.navigate('Conditions', {
            email: result.email,
            id: result.id,
        });
    }
    
    //submit form to backend
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

        if(data.birthDate == '//') data.birthDate = ''; //reset birthdate to blank if nothing was entered
        //Check empty fields (only if all empty)
        if(data.firstName == '' && data.lastName == '' && data.stdNum == ''
        && data.email == '' && data.birthDate == ''){
            this.setState({errorMessage: 'No fields entered', isLoading: false});
            return;
        }
        //submit data
        this.vultr.submitSignUp(data)
            .then((result) => {
                this.setState({isLoading: false, errorMessage: ''});
                this.handleSubmitResult(result);
            
            }).catch(error => {
                //Set error alerts for user already registered or search found too many users
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


    //MAIN RENDER
	render() {

        const actInd = this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View/>;
		return (
			<View style={styles.container}>
            <KeyboardAwareScrollView>
            <ScrollView>
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

                <View style={styles.topInput}>
                    
                    <View style={styles.inputContDate}>
                        <Text style={styles.inputText}>
                            DD
                        </Text>
                        <TextInput style={styles.inputBoxDate}
                            placeholder={this.state.day} onChangeText={(t) => this.setState({day:t})} 
                            underlineColorAndroid='transparent' placeholderTextColor='grey' keyboardType={'numeric'}/>
                    </View>
                    <View style={styles.inputContDate}>
                        <Text style={styles.inputText}>
                            MM
                        </Text>
                        <TextInput style={styles.inputBoxDate}
                            placeholder={this.state.month} onChangeText={(t) => this.setState({month:t})} 
                            underlineColorAndroid='transparent' placeholderTextColor='grey' keyboardType={'numeric'}/>
                    </View>
                    <View style={styles.inputContYear}>
                        <Text style={styles.inputText}>
                            YYYY
                        </Text>
                        <TextInput style={styles.inputBoxDate}
                            placeholder={this.state.year} onChangeText={(t) => this.setState({year:t})} 
                            underlineColorAndroid='transparent' placeholderTextColor='grey' keyboardType={'numeric'}/>
                    </View>
                    
                </View>

                <FormInput title='First Name' onChangeText={(a) => this.setState({firstName:a})} 
                    value={this.state.firstName} />
                <FormInput title='Last Name' onChangeText={(a) => this.setState({lastName:a})} 
                    value={this.state.lastName} />
                <FormInput title='Student Number' onChangeText={(a) => this.setState({stdNum:a})} 
                    value={this.state.stdNum} keyboardType='numeric' />
                <FormInput title='UOW Email' onChangeText={(a) => this.setState({email:a})} 
                    value={this.state.email} keyboardType='email-address' autoCapitalize='none'/>

            </ScrollView>
            </KeyboardAwareScrollView>
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Continue' nav={() => this.submitForm()} />
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