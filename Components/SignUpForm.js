

import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, TextInput, View, TouchableHighlight, Image, ActivityIndicator} from 'react-native';
import { styles } from './FormStyles';
import { DefaultButton } from './DefaultButton';


export default class SignUpForm extends Component {
	/*static navigationOptions = {
		title: 'Sign Up',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
    }*/

    state = {
        errorMessage: '',
        isLoading: false,
        firstName: 'balls',
        lastName: '',
        stdNum: '',
        email: '',
    };

    componentDidMount(){
        this.props.firebase = this.props.screenProps;
    }
    
    submitForm() {
        this.setState({isLoading: true, errorMessage: ''});
        
        /////////////////////////////////////////////////////
        //////////// TODO: Possibly do some field checking to see if anything is filled out
        /////////////////////////////////////////////////////

        //Create JSON data from form
        /*const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            //TODO: DOB...
            stdNum: this.state.stdNum,
            email: this.state.email,
        };*/

        //send data to cloud function here
        /*var checkUser = firebase.functions().httpsCallable('checkUser');
        addMessage(data)
            .then((result) => {
                this.setState({isLoading: false, errorMessage: ''});
                
                /////////////////////////////////////////////////////
                //////////// TODO: Possibly need to handle a returned user ID for linking
                /////////////////////////////////////////////////////
                
                */this.props.navigation.navigate('SUFinish', {
                    email: this.state.email,
                    uid: '', //TODO: add uis later maybe
                });/* //navigate and pass on email
            
            }).catch(error => {
                this.setState({isLoading: false, errorMessage: error.message});
            });*/
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

                <Text style={stylesA.errorText}>
                    {this.state.errorMessage}
                </Text>

                <View style={stylesA.activityView}>
                    {actInd}
                </View>

                <ScrollView>
                <View style={styles.topInput}>
                    
                    <View style={styles.inputContDate}>
                        <Text style={styles.inputText}>
                            DD
                        </Text>
                        <TextInput style={styles.inputBoxDate}
                            placeholder='25' underlineColorAndroid='transparent' placeholderTextColor='grey'/>
                    </View>
                    <View style={styles.inputContDate}>
                        <Text style={styles.inputText}>
                            MM
                        </Text>
                        <TextInput style={styles.inputBoxDate}
                            placeholder='05' underlineColorAndroid='transparent' placeholderTextColor='grey'/>
                    </View>
                    <View style={styles.inputContYear}>
                        <Text style={styles.inputText}>
                            YYYY
                        </Text>
                        <TextInput style={styles.inputBoxDate}
                            placeholder='2018' underlineColorAndroid='transparent' placeholderTextColor='grey'/>
                    </View>
                    
                </View>

                {this.renderInput('First Name', '',     (value) => this.setState({firstName: value}) )}
                {this.renderInput('Last Name', '',      (value) => this.setState({lastName: value}) )}
                {this.renderInput('Student Number', '', (value) => this.setState({stdNum: value}) )}
                {this.renderInput('UOW email', '',      (value) => this.setState({email: value}) )}
				
                </ScrollView>
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Continue' nav={() => this.submitForm()} />
                    <DefaultButton title='Back' nav={() => this.props.navigation.navigate('Login')} />
                </View>
			</View>
		);
		}
    };
    
    const stylesA = StyleSheet.create({
       
        topPadding: {
            flex: 0.1,
        },
        errorText: {
            color: 'red',
        },
        activityView: {
            justifyContent: 'center',
            alignContent: 'center',
        },
    });