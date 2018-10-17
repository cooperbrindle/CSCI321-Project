

import React, { Component } from 'react';
import { Text, TextInput, View, Alert, ActivityIndicator} from 'react-native';

//Styles
import { styles } from '../styles/FormStyles';
import { baseStyles } from '../styles/BaseStyles';

//Custom Props
import { DefaultButton } from '../CustomProps/DefaultButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { navigationOptionsFunc } from '../styles/navOptions';


export default class EventRego extends Component {
	static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Event Registration', navigation, false);
	}

	//Load data passed from event single page
    componentWillMount(){
        try{
            const eventData = this.props.navigation.getParam('eventData', 'NoData');
            if(eventData == 'NoData'){
                console.error('NO DATA PASSED TO EVENT PAGE');
                this.props.navigation.goBack();
            }
            var vultr = this.props.screenProps;
            this.setState({vultr: this.props.screenProps});
            this.setState({
                eventData: eventData,
                position: vultr.data.position,
                orgName: vultr.data.orgName,
                dietary: '',
                wheelchair: '',
                guests: '0',
                isLoading: false,
                didLoad: true,
            });
            }catch(err){console.warn('try catch error: ' + err.message);}
        
        this.setState({ errorMessage: '',});
    }

     ////////////////////////////////////////////////////////////////////////////////////////////
    //Builds page
	render() {
        var subBtn;
        if(this.state.isLoading)subBtn = <View/>
        else subBtn = (<View style={styles.submitBtnCont}>
                <DefaultButton title='Submit' nav={() => this.submitRego()} />
            </View>)
		return (
			<View style={styles.container}>
				<Text style={styles.title}>
                    {this.state.eventData.eventname}
                </Text>
                <Text style={baseStyles.errorText}>{this.state.errorMessage}</Text>
                {this.renderForm()}
                {subBtn}
			</View>
		);
    }
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    //Renders the form for data entry
    renderForm(){
        if(this.state.isLoading)
            return (
                <View style={baseStyles.activityView}>
                    <ActivityIndicator size='large' color='#cc0000'/>
                </View>
            )
        else return (
            <KeyboardAwareScrollView>
                {this.renderInput('Job Title', '', (a) => this.setState({position:a}), this.state.position, true)}
                {this.renderInput('Employer', '', (a) => this.setState({orgName:a}), this.state.orgName, true)}
                {this.renderInput('Dietary Requirements (if any)', '', (a) => this.setState({dietary:a}), this.state.dietary, true)}
                {this.renderInput('Mobility Requirements (if any)', '', (a) => this.setState({wheelchair:a}), this.state.wheelchair, true)}
                {this.renderInput('Number of Guests', '', (a) => this.setState({guests:a}), this.state.guests, true, 'numeric')}
            </KeyboardAwareScrollView>
        )
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //Handles all form inputs
    renderInput(title, ph, onChangeT, v, edita, keyboardType){
        if(!keyboardType) keyboardType = 'default';
		return(
			<View style={styles.inputCont}>
                <Text style={styles.inputText}>
                    {title}
                </Text>
                <TextInput style={styles.inputBox}
                    placeholder={ph} underlineColorAndroid='transparent' placeholderTextColor='grey'
                    onChangeText={onChangeT} keyboardType={keyboardType}
                    value={v} editable = {edita}/>
            </View>
		)
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Submits the rego info to server and if theres a guest redirects to guest rego page, else it goes to the home page
	submitRego(){
        this.setState({isLoading: true, errorMessage: ''});
        var constInfo = {
            position: this.state.position, 
            orgName: this.state.orgName, 
            dietary: this.state.dietary, 
            wheelchair: this.state.wheelchair,
        }
        this.props.screenProps.registerConst(this.state.eventData, constInfo)
        .then(() => {
            this.setState({isLoading: false, errorMessage: ''});
            if(this.state.guests != '0'){
                this.props.navigation.navigate('GuestRego', {eventData: this.state.eventData});
            }
            else{
                Alert.alert(
                    'Submitted',
                    'You have been successfully registered for the ' + this.state.eventData.eventname,
                    [
                        {text: 'OK', onPress: () => this.props.navigation.navigate('HomePage')},
                    ],
                    { cancelable: false }
                )
            }
        }).catch(error => {
            this.setState({isLoading: false, errorMessage: error});
            Alert.alert(
                'Oops!',
                'You have already registered for this event',
                [
                    {text: 'OK', onPress: () => this.props.navigation.goBack()},
                ],
                { cancelable: false }
            )
        });
	}
};