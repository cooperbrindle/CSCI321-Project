

import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View, Alert} from 'react-native';
import { DefaultButton } from '../CustomProps/DefaultButton';

//styles
import { navigationOptionsFunc } from '../styles/navOptions';
import { styles } from '../styles/FormStyles';
import { baseStyles } from '../styles/BaseStyles';


//TERMS AND CONDITIONS
const TCs = '-  Access a wide range of online resources, including e-journals and databases\n\n'+
            '-  Borrow 30 items for 28 days at the Wollongong location, or five items at other locations\n\n'+
            '-  Renew items and place up to 10 holds at a time.\n\n';


export default class Conditions extends Component {
    
    //Nav header
    static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Terms and Conditions', navigation, false);
	}

    state = {
        errorMessage: '',
        isLoading: false,
        email: '',
        password: '',
        passwordConf: '',
    };

    componentDidMount(){
        this.props.vultr = this.props.screenProps;
        var emailProp = this.props.navigation.getParam('email', '');
        id = this.props.navigation.getParam('id', '');
        this.setState({email: emailProp, id: id});
    }
    
    //Accept button press handler
    submit(){
        this.setState({errorMessage: '', isLoading: true});
        this.props.navigation.navigate('SUFinish', {
            email: this.state.email,
            id: this.state.id,
        });
    }

    //decline button press handler
    refuse(){
        Alert.alert(
            'Account Not Created',
            'Unfortunately you did not accept our Terms and Conditions.\nYou will now be redirected to the login page!',
            [
                {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
            ],
            { cancelable: false }
        )
    }

    //MAIN RENDER
	render() {
		return (
			<View style={baseStyles.container}>
				<ScrollView style={thisStyles.blurbView}>         
                    <Text style={thisStyles.blurbTextPoints}>
                        {TCs}
                    </Text>
                </ScrollView>
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Accept' nav={() => this.submit()} />
                    <DefaultButton title='Decline' nav={() => this.refuse()} />
                </View>

			</View>
		);
		}
    };
    
    const thisStyles = StyleSheet.create({
        
        blurbView: {
            flex:1,
            backgroundColor: '#0C2340',
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: 10,
            marginBottom: 10,
        },
        blurbTextPoints: {
            color:'white',
            fontSize: 10,
            paddingLeft: 20,
        },
    });