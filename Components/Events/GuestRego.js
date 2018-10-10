

import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, TextInput, View, TouchableHighlight, Image} from 'react-native';
import { styles } from '../FormStyles';
import { DefaultButton } from '../CustomProps/DefaultButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class GuestRego extends Component {
	static navigationOptions = {
		title: 'Guest Registration',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
		},
    }
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

	/////////////////////////////////////
    //
    componentWillMount(){
        try{
            const pageData = this.props.navigation.getParam('data', 'NoData');
            if(pageData == 'NoData'){
                console.error('NO DATA PASSED TO EVENT PAGE');
                this.props.navigation.goBack();
            }
            var vultr = this.props.screenProps;
            this.setState({vultr: this.props.screenProps});
            this.setState({
                eventData: pageData,
                eventname: pageData.eventname,
                constData: vultr.data.id,
                isLoading: false,
                didLoad: true,
            });
            }catch(err){console.warn('try catch error: ' + err.message);}
        
        this.setState({
            errorMessage: '',
            
        });
    }
    //
	/////////////////////////////////////

	submitRego(){
        this.setState({isLoading: true, errorMessage: ''});
        var guestData = {
            title: this.state.title,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            position: this.state.position,
            orgName: this.state.orgName,
            dietary: this.state.dietary,
            wheelchair: this.state.wheelchair,
        }
        this.props.screenProps.registerConst(this.state.eventData, guestData)
        .then(() => {
            this.setState({isLoading: false, errorMessage: ''});

        }).catch(error => {
            this.setState({isLoading: false, errorMessage: error.message});
        });
        Alert.alert(
            'Submitted',
            [
                {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
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
			<View style={styles.container}>
				<Text style={styles.title}>
                    {this.state.eventname}
                </Text>
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
                                onChangeText={(t) => this.setState({firstname:t})}
                                value={this.state.firstname} />
                    </View>
                </View>
                {this.renderInput('Last Name', '', (a) => this.setState({lastname:a}), this.state.lastname, true)}
                {this.renderInput('Job Title', '', (a) => this.setState({position:a}), this.state.position, true)}
                {this.renderInput('Employer', '', (a) => this.setState({orgName:a}), this.state.orgName, true)}
                {this.renderInput('Dietary Requirements (if any)', '', (a) => this.setState({dietary:a}), this.state.dietary, true)}
                {this.renderInput('Wheelchair Access Required', '', (a) => this.setState({wheelchair:a}), this.state.wheelchair, true)}
                </KeyboardAwareScrollView>
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Submit' nav={() => this.submitRego()} />
                </View>
			</View>
		);
	}
};

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