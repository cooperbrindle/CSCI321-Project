

import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableHighlight, Text, TextInput, View, Alert, ActivityIndicator, Image} from 'react-native';
import { styles } from '../styles/FormStyles';
import { DefaultButton } from '../CustomProps/DefaultButton';

import { baseStyles } from '../styles/BaseStyles';
const settingsIcon = require('../assets/Settings.png');

export default class PasswordForm extends Component {
    static navigationOptions = ({navigation}) => {
		return {
		title: 'Password',
		headerStyle: {
			backgroundColor: '#0C2340',
			
		},
		headerTintColor: 'white',
		headerRight: (
			<TouchableHighlight 
				onPress={navigation.getParam('toggleSettings')}
			>
				<Image source={settingsIcon}
					style={{resizeMode: 'contain', width: 40, height: 40 }}
				/>
			</TouchableHighlight>	
		),
	}};//width: 40, height: 40

	toggleSettings = () => {
		this.props.navigation.toggleDrawer();;
	}

	/////////////////////////////////////
    //
    componentWillMount(){
        this.setState({
            errorMessage: '',
            isLoading: false,
            oldPassword: '',
            newPassword1: '',
            newPassword2: '',
        });
        this.props.navigation.setParams({toggleSettings: this.toggleSettings})
    }

    saveChanges(){
        this.setState({errorMessage: '', isLoading: true})
        if(this.state.oldPassword == '' || this.state.newPassword1 == '' || this.state.newPassword2 == ''){
            this.setState({errorMessage: 'Please enter all fields', isLoading: false});
            return;
        }
        if(this.state.newPassword1 != this.state.newPassword2){
            this.setState({errorMessage: 'Passwords do not match', isLoading: false});
            return;
        }

        var vultr = this.props.screenProps;
        vultr.updatePassword(this.state.newPassword1, this.state.oldPassword)
        .then(() => {
            this.setState({isLoading: false});
            Alert.alert(
                'Success!',
                'Password successfully updated',
                [
                    {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
                ],
                { cancelable: false }
            )
        }).catch((error) => {
            this.setState({errorMessage: error, isLoading: false});
            return;
        })
    }

	renderInput(title, ph, onChangeT, v){
		return(
			<View style={styles.inputCont}>
                <Text style={styles.inputText}>
                    {title}
                </Text>
                <TextInput style={styles.inputBox}
                    placeholder={ph} underlineColorAndroid='transparent' placeholderTextColor='grey'
                    onChangeText={onChangeT} secureTextEntry autoCapitalize='none'
                    value={v} />
            </View>
		)
	}

	render() {
        const actInd = this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View/>;
		return (
			<View style={styles.container}>
				<Text style={styles.title}>
                    Update Password
                </Text>

                <Text style={baseStyles.errorText}>
                    {this.state.errorMessage}
                </Text>
                <View style={baseStyles.activityView}>
                    {actInd}
                </View>

				{this.renderInput('Old Password', '', (a) => this.setState({oldPassword:a}), this.state.oldPassword)}
				{this.renderInput('New Password', '', (a) => this.setState({newPassword1:a}), this.state.newPassword1)}
                {this.renderInput('Confirm Password', '', (a) => this.setState({newPassword2:a}), this.state.newPassword2)}
				
                <View style={styles.submitBtnCont}>
					<DefaultButton title='Submit' nav={() => this.saveChanges()} />
                    <DefaultButton title='Cancel' nav={() => this.props.navigation.navigate('Home')} />
                </View>
			</View>
		);
		}
	};
