

import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, TextInput, View, Alert, Image} from 'react-native';
import { styles } from '../styles/FormStyles';
import { DefaultButton } from '../CustomProps/DefaultButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const libraryLogo = require('../assets/libraryLogo.jpg');

const blurbPoints = '-  Access a wide range of online resources, including e-journals and databases\n\n'+
            '-  Borrow 30 items for 28 days at the Wollongong location, or five items at other locations\n\n'+
            '-  Renew items and place up to 10 holds at a time.\n\n';

const blurbEnd = 'New membership applications will be processed and confirmed within 5-7 business days via return email.';

export default class LibraryMembership extends Component {
	static navigationOptions = {
		title: 'Library Membership',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
		},
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
			<View style={thisStyles.container}>
                    <Image style={thisStyles.logo}
                        source={libraryLogo} />
                

                <Text style={thisStyles.title}>
                    Claim your library card!
                </Text>

				<ScrollView style={thisStyles.blurbView}>
                    
                    <Text style={thisStyles.blurbTextPoints}>
                        {blurbPoints}
                    </Text>
                </ScrollView>
                
                {this.renderInput('Preferred Email', '', (a) => this.setState({email:a}), this.state.email, true)}
				
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Claim Now' nav={() => this.submit()} />
                </View>

			</View>
		);
		}
    };
    
    const thisStyles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#0C2340',
        },
        title: {
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 36,
            color: 'white',
            marginBottom: 10,
        },
        blurbView: {
            flex:1,
            backgroundColor: '#0C2340',
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: 20,
            marginBottom: 10,
        },
        logo: {
            flex:0.5,
            alignSelf: 'center',
            resizeMode: 'center',
        },
        blurbTextPoints: {
            color:'white',
            fontSize: 18,
            paddingLeft: 20,
        },
        blurbTextEnd: {
            color:'white',
            fontSize: 14,
        },
    });