

import React, { Component } from 'react';
import { Text, TextInput, View, Alert, ActivityIndicator} from 'react-native';
import { styles } from './styles/FormStyles';
import { DefaultButton } from './CustomProps/DefaultButton';
import { navigationOptionsFunc } from './styles/navOptions';

import { baseStyles } from './styles/BaseStyles';

export default class ForgotPassword extends Component {
    
    static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Forgot Password', navigation, false);
	}

	/////////////////////////////////////
    //
    componentWillMount(){
        this.setState({
            errorMessage: '',
            isLoading: false,
            email: 'ecwarren1@gmail.com',
            firstName: 'Emily',
            lastName: 'Warren',
        });
    }

    saveChanges(){
        this.setState({errorMessage: '', isLoading: true})
        if(this.state.email == '' || this.state.firstName == '' || this.state.lastName == ''){
            this.setState({errorMessage: 'Please enter all Fields', isLoading: false});
            return;
        }

        var vultr = this.props.screenProps;
        vultr.resetPassword(this.state.email, this.state.firstName, this.state.lastName)
        .then(() => {
            this.setState({isLoading: false});
            Alert.alert(
                'Success!',
                'Temporary password sent to ' + this.state.email,
                [
                    {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
                ],
                { cancelable: false }
            )
        }).catch((error) => {
            this.setState({errorMessage: error, isLoading: false});
            return;
        })
    }

	renderInput(title, ph, onChangeT, v, auto, keyboardType){
        if(!keyboardType) keyboardType = 'default'
		return(
			<View style={styles.inputCont}>
                <Text style={styles.inputText}>
                    {title}
                </Text>
                <TextInput style={styles.inputBox}
                    placeholder={ph} underlineColorAndroid='transparent' placeholderTextColor='grey'
                    onChangeText={onChangeT} autoCapitalize={auto} keyboardType={keyboardType}
                    value={v} />
            </View>
		)
	}

	render() {
        const actInd = this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View/>;
		return (
			<View style={baseStyles.container}>
				<Text style={styles.title}>
                    Reset your password
                </Text>

                <Text style={baseStyles.errorText}>
                    {this.state.errorMessage}
                </Text>
                <View style={baseStyles.activityView}>
                    {actInd}
                </View>

                {this.renderInput('Email', '', (a) => this.setState({email:a}), this.state.email, 'none', 'email-address')}
                {this.renderInput('First Name', '', (a) => this.setState({firstName:a}), this.state.firstName, 'sentences')}
				{this.renderInput('Last Name', '', (a) => this.setState({lastName:a}), this.state.lastName, 'sentences')}
				
                <View style={styles.submitBtnCont}>
					<DefaultButton title='Submit' nav={() => this.saveChanges()} />
                </View>
			</View>
		);
		}
	};
