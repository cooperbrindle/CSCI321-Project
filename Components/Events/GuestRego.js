

import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, ActivityIndicator} from 'react-native';

//Styles
import { styles } from '../styles/FormStyles';
import { baseStyles } from '../styles/BaseStyles';

//Custom Props
import { DefaultButton } from '../CustomProps/DefaultButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { navigationOptionsFunc } from '../styles/navOptions';

export default class GuestRego extends Component {
    
    //Nav header
    static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Guest Registration', navigation, false);
    }
    //Sets Default values
    state = {
        errorMessage: '',
        isLoading: false,
        title: '',
        firstName: '',
        lastName: '',
        position: '',
        orgName: '',
        dietary: '',
        wheelchair: '',
    };

	////////////////////////////////////////////////////////////////////
    //Loads data from previous screen
    componentWillMount(){
        try{
            const pageData = this.props.navigation.getParam('eventData', 'NoData');
            if(pageData == 'NoData'){
                console.error('NO DATA PASSED TO GUEST PAGE');
                this.props.navigation.goBack();
            }
            var vultr = this.props.screenProps;
            this.setState({vultr: this.props.screenProps});
            this.setState({
                eventData: pageData,
                eventname: pageData.eventname,
                constData: vultr.data.id,
                constName: vultr.data.firstName,
                isLoading: false,
                didLoad: true,
            });
            }catch(err){console.warn('try catch error: ' + err.message);}
        
        this.setState({
            errorMessage: '',
            
        });
    }

    //////////////////////////////////////////////////////////////////////////
    //Builds page by calling renderForm()
	render() {
        var subBtn;
        if(this.state.isLoading)subBtn = <View/>
        else subBtn = (<View style={styles.submitBtnCont}>
                <DefaultButton title='Submit' nav={() => this.submitRego()} />
            </View>)
		return (
			<View style={styles.container}>
				<Text style={styles.title}>
                    {this.state.eventname}
                </Text>
                <Text style={baseStyles.errorText}>{this.state.errorMessage}</Text>
                {this.renderForm()}
                {subBtn}
			</View>
		);
    }
    
    //////////////////////////////////////////////////////////////////////
    //Builds data inpput form
    renderForm(){
        if(this.state.isLoading)
            return (
                <View style={baseStyles.activityView}>
                    <ActivityIndicator size='large' color='#cc0000'/>
                </View>
            )
        else return (
            <KeyboardAwareScrollView>
                <View style={guestStyles.topInputCont}>
                    <View style={guestStyles.titleView}>
                        <Text style={styles.inputText}>
                            Title
                        </Text>
                        <TextInput style={guestStyles.titleInput}
                            placeholder='' underlineColorAndroid='transparent' placeholderTextColor='grey'
                            onChangeText={(t) => this.setState({title:t})}
                            value={this.state.title} />
                    </View>
                    <View style={guestStyles.fnView}>
                        <Text style={styles.inputText}>
                            First Name
                        </Text>
                            <TextInput style={guestStyles.firstNameInput}
                                placeholder='' underlineColorAndroid='transparent' placeholderTextColor='grey'
                                onChangeText={(t) => this.setState({firstName:t})}
                                value={this.state.firstName} />
                    </View>
                </View>
                {this.renderInput('Last Name', '', (a) => this.setState({lastName:a}), this.state.lastName, true)}
                {this.renderInput('Job Title', '', (a) => this.setState({position:a}), this.state.position, true)}
                {this.renderInput('Employer', '', (a) => this.setState({orgName:a}), this.state.orgName, true)}
                {this.renderInput('Dietary Requirements (if any)', '', (a) => this.setState({dietary:a}), this.state.dietary, true)}
                {this.renderInput('Mobility Requirements (if any)', '', (a) => this.setState({wheelchair:a}), this.state.wheelchair, true)}
            </KeyboardAwareScrollView>
        )
    }

    /////////////////////////////////////////////////////////////////////////////
    //Builds form items and gets input
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

	//////////////////////////////////////////////////////////////////
    //Calls validateData() then submits data to server
	submitRego(){
        if(!this.validateData()){
            Alert.alert(
                'Invalid Input',
                'First and Last Name Must Not Be Blank',
                [
                    {text: 'OK', onPress: () => {return}},
                ],
                { cancelable: false }
            )
            
        }
        else{
            this.setState({isLoading: true, errorMessage: ''});
            var guestData = {
                //Sets guest data to inputted data
                title: this.state.title,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                position: this.state.position,
                orgName: this.state.orgName,
                dietary: this.state.dietary,
                wheelchair: this.state.wheelchair,
            }
            //Passes guestData object to server
            this.props.screenProps.registerGuest(this.state.eventData, guestData)
            .then(() => {
                this.setState({isLoading: false, errorMessage: ''});
                Alert.alert(
                    'Submitted',
                    this.state.constName + ' and ' + this.state.firstName + ' have been successfully registered for the ' + this.state.eventname,
                    [
                        {text: 'OK', onPress: () => this.props.navigation.navigate('HomePage')},
                    ],
                    { cancelable: false }
                )

            }).catch(error => {
                this.setState({isLoading: false, errorMessage: error});
            });
        }
	}
    
    //////////////////////////////////////////////////////////////////////////
    //Confirms minimum data input
    validateData(){
        ////////////////Empty Input validation
        if(this.state.firstName == '' || this.state.lastName == ''){
            return false;
        }
        return true;
    }
};

///////////////////////////////////////////////////////////////////
//Custom styles for this page
const guestStyles = StyleSheet.create({
    
    topInputCont: {
        flexDirection: 'row',
    },

    titleView: {
        flex: 1,
        flexDirection: 'column',
        marginRight: 20,
    },

    fnView: {
        flex: 2,
        flexDirection: 'column',
    },

    firstNameInput: {
        color: 'grey',
        paddingLeft: 10,
        backgroundColor:'#d9d9d6',
        height: 50,
        borderRadius:5,
    },
    titleInput: {
        color: 'grey',
        paddingLeft: 10,
        backgroundColor:'#d9d9d6',
        height: 50,
        borderRadius:5,
    }
});