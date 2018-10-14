

import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View, Alert, Image} from 'react-native';
import { styles } from '../styles/FormStyles';
import { DefaultButton } from '../CustomProps/DefaultButton';
import { navigationOptionsFunc } from '../styles/navOptions';
import { staticStyles } from '../styles/BenefitsStyles';

const libraryLogo = require('../assets/libraryLogo.jpg');

const blurbPoints = '-  Access a wide range of online resources, including e-journals and databases\n\n'+
            '-  Borrow 30 items for 28 days at the Wollongong location, or five items at other locations\n\n'+
            '-  Renew items and place up to 10 holds at a time.\n\n';

const blurbEnd = 'New membership applications will be processed and confirmed within 5-7 business days via return email.';

export default class LibraryMembership extends Component {
	static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Library Membership', navigation, false);
	}
    
    /////////////////////////////////////////////////////////
    /////////////////////
    componentWillMount(){
        try{
            var vultr = this.props.screenProps;
            this.setState({vultr: this.props.screenProps});
            this.setState({
                email: vultr.data.email, 
            });
            }catch(err){console.warn('try catch error: ' + err.message);}
        
        this.setState({
            errorMessage: '',
            
        });
    }
    /////////////////////////////////////
    //
    submit(){
        this.setState({errorMessage: '', isLoading: true});
        try{
            console.warn('starting submit');
            this.state.vultr.libraryReq(this.state.email)
            .then(() => {
                this.setState({errorMessage: '',
                    successMessage: 'Successfully updated',
                    isLoading: false
                });
            }).catch(() => {
                this.setState({errorMessage: 'Error updating libraryMem',
                    successMessage: '',
                    isLoading: false
                });
            })
        }catch(err){console.warn('catch error: '+ err.message);}
        Alert.alert(
            'Submitted',
            blurbEnd,
            [
                {text: 'OK', onPress: () => this.props.navigation.goBack()},
            ],
            { cancelable: false }
        )
    }
    
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
			<View style={staticStyles.container}>
                    <Image style={staticStyles.logo}
                        source={libraryLogo} />
                

                <Text style={staticStyles.title}>
                    Claim your library card!
                </Text>

				<ScrollView style={staticStyles.blurbView}>
                    
                    <Text style={staticStyles.blurbTextPoints}>
                        {blurbPoints}
                    </Text>
                </ScrollView>
                
                {this.renderInput('Preferred Email', '', (a) => this.setState({email:a}), this.state.email, true)}
				
                <View style={staticStyles.submitBtnCont}>
                    <DefaultButton title='Claim Now' nav={() => this.submit()} />
                </View>

			</View>
		);
		}
    };