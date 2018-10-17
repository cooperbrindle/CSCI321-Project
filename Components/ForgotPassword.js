/////////////////////////////////////////
// FORGOT PASSWORD PAGE
//
// - resets users password to temporary one
//  and emails to supplied email if match found
/////////////////////////////////////////

import React, { Component } from 'react';
import { Text, TextInput, View, Alert, ActivityIndicator, ScrollView} from 'react-native';

//styles
import { styles } from './styles/FormStyles';
import { baseStyles } from './styles/BaseStyles';
import { navigationOptionsFunc } from './styles/navOptions';

//custom props
import { FormInput } from './CustomProps/FormInput';
import { DefaultButton } from './CustomProps/DefaultButton';


export default class ForgotPassword extends Component {
    
    //nav header
    static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Forgot Password', navigation, false);
	}

	
    componentWillMount(){
        this.setState({
            errorMessage: '',
            isLoading: false,
            email: 'ecwarren1@gmail.com',
            firstName: 'Emily',
            lastName: 'Warren',
        });
    }

    //Submit Button press handler
    saveChanges(){
        this.setState({errorMessage: '', isLoading: true})
        //Check if any empty fields
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

    //MAIN RENDER
	render() {
        const actInd = this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View/>;
		return (
			<View style={baseStyles.container}>
                <ScrollView>
				<Text style={styles.title}>
                    Reset your password
                </Text>

                <Text style={baseStyles.errorText}>
                    {this.state.errorMessage}
                </Text>
                <View style={baseStyles.activityView}>
                    {actInd}
                </View>

                <FormInput title='Email' onChangeText={(a) => this.setState({email:a})} 
                    value={this.state.email} autoCapitalize='none' keyboardType='email-address' autoCapitalize='none'/>
                <FormInput title='First Name' onChangeText={(a) => this.setState({firstName:a})} 
                    value={this.state.firstName} />
                <FormInput title='Last Name' onChangeText={(a) => this.setState({lastName:a})} 
                    value={this.state.lastName} />
                
                </ScrollView>
                <View style={styles.submitBtnCont}>
					<DefaultButton title='Submit' nav={() => this.saveChanges()} />
                </View>
			</View>
		);
		}
	};
