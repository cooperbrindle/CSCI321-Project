

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, Alert} from 'react-native';
import { styles } from '../FormStyles';
import { DefaultButton } from '../CustomProps/DefaultButton';

export default class ContactForm extends Component {
    static navigationOptions = {
		title: 'Update Details',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
		},
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
    }

    saveChanges(){
        this.setState({errorMessage: '', isLoading: true})
        if(this.state.oldPassword == '' || this.state.newPassword1 == '' || this.state.newPassword2 == ''){
            this.setState({errorMessage: 'Please enter all fields'});
            return;
        }
        if(this.state.newPassword1 != this.state.newPassword2){
            this.setState({errorMessage: 'Passwords do not match'});
            return;
        }

        var vultr = this.props.ScreenProps
        vultr.updatePassword(this.state.newPassword1)
        .then(() => {
            this.setState({isLoading: false});
            Alert.alert(
                'Success!',
                'Password successfully updated',
                [
                    {text: 'OK', onPress: () => this.props.navigation.goBack()},
                ],
                { cancelable: false }
            )
        }).catch((error) => {
            this.setState({errorMessage: error});
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
                    onChangeText={onChangeT}
                    value={v} />
            </View>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>
                    Update Password
                </Text>

				{this.renderInput('Old Password', '', (a) => this.setState({oldPassword:a}), this.state.oldPassword)}
				{this.renderInput('New Password', '', (a) => this.setState({newPassword1:a}), this.state.newPassword1)}
                {this.renderInput('Confirm Password', '', (a) => this.setState({newPassword2:a}), this.state.newPassword2)}
				
                <View style={styles.submitBtnCont}>
					<DefaultButton title='Save' nav={() => this.saveChanges()} />
                    <DefaultButton title='Discard' nav={() => this.props.navigation.goBack()} />
                </View>
			</View>
		);
		}
	};
