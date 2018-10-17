/////////////////////////////////////////
// UPDATE PASSWORD PAGE
// - used for user to update their password
////////////////////////////////////////

import React, { Component } from 'react';
import { Text, TextInput, View, Alert, ActivityIndicator } from 'react-native';

//styles
import { styles } from '../styles/FormStyles';
import { baseStyles } from '../styles/BaseStyles';
import { navigationOptionsFunc } from '../styles/navOptions';

//custom props
import { FormInput } from '../CustomProps/FormInput';
import { DefaultButton } from '../CustomProps/DefaultButton';

export default class PasswordForm extends Component {
    
    //Nav bar
    static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Update Password', navigation, true);
	}

    //setings button function to bind to nav bar
	toggleSettings = () => {
		this.props.navigation.toggleDrawer();;
	}

	//set data
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

    //submit changes press handler
    saveChanges(){
        this.setState({errorMessage: '', isLoading: true})
        
        //If any field is empty
        if(this.state.oldPassword == '' || this.state.newPassword1 == '' || this.state.newPassword2 == ''){
            this.setState({errorMessage: 'Please enter all fields', isLoading: false});
            return;
        }
        //If passwords do not match
        if(this.state.newPassword1 != this.state.newPassword2){
            this.setState({errorMessage: 'Passwords do not match', isLoading: false});
            return;
        }

        //submit
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


    //MAIN RENDER
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

				<FormInput title='Old Password' onChangeText={(a) => this.setState({oldPassword:a})} 
                    value={this.state.oldPassword} secureTextEntry={true} autoCapitalize='none' />
                <FormInput title='New Password' onChangeText={(a) => this.setState({newPassword1:a})} 
                    value={this.state.newPassword1} secureTextEntry={true} autoCapitalize='none'/>
                <FormInput title='Confirm Password' onChangeText={(a) => this.setState({newPassword2:a})} 
                    value={this.state.newPassword2} secureTextEntry={true} autoCapitalize='none'/>
                
                <View style={styles.submitBtnCont}>
					<DefaultButton title='Submit' nav={() => this.saveChanges()} />
                    <DefaultButton title='Cancel' nav={() => this.props.navigation.navigate('Home')} />
                </View>
			</View>
		);
		}
	};
