

import React, { Component } from 'react';
import { Platform, StyleSheet, ScrollView, Text, TextInput, View, TouchableHighlight, Image} from 'react-native';
import { styles } from './FormStyles';
import { DefaultButton } from './DefaultButton';


export default class AccountForm extends Component {
	static navigationOptions = {
		title: 'Update Details',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
    }
    
    /////////////////////////////////////
    //
    componentWillMount(){
        console.warn('Component Mounting');
        const data = this.props.navigation.getParam('data', 'NoData');
        if(data == 'NoData'){
            console.error('NO DATA PASSED TO ACCOUNT FORM PAGE');
            this.props.navigation.goBack();
        }
        this.state = {
            title: data.title,
            firstName: data.firstName,
            lastName: data.lastName,
            day: data.day,
            month: data.month,
            year: data.year,
            stdNum: data.stdNum
        };
    }

    saveChanges(){
        let data = this.props.navigation.getParam('data', 'NoData');
        try{
            data.title = this.state.title;
            data.firstName = this.state.firstName;
            data.lastName = this.state.lastName;
            data.Day = this.state.day;
            data.Month = this.state.Month;
            data.year = this.state.year;
            data.stdNum = this.state.stdNum;
        }catch(err){
            console.warn('ERROR: '+ err.message);
        }
        this.props.navigation.goBack();
    }
    //
    /////////////////////////////////////

    
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
                    Account Info
                </Text>
                <ScrollView>
                <View style={styles.topInput}>
                    <View style={styles.inputContSmall}>
                        <Text style={styles.inputText}>
                            Title
                        </Text>
                        <TextInput style={styles.inputBoxSmall}
                            placeholder='' underlineColorAndroid='transparent' placeholderTextColor='grey'
                            onChangeText={(t) => this.setState({title:t})}
                            value={this.state.title} />
                    </View>
                    
                    <View style={styles.inputContDate}>
                        <Text style={styles.inputText}>
                            DD
                        </Text>
                        <TextInput style={styles.inputBoxDate}
                            placeholder='' underlineColorAndroid='transparent' placeholderTextColor='grey'
                            onChangeText={(d) => this.setState({day:d})}
                            value={this.state.day} />
                    </View>
                    <View style={styles.inputContDate}>
                        <Text style={styles.inputText}>
                            MM
                        </Text>
                        <TextInput style={styles.inputBoxDate}
                            placeholder='' underlineColorAndroid='transparent' placeholderTextColor='grey'
                            onChangeText={(m) => this.setState({month:m})}
                            value={this.state.month} />
                    </View>
                    <View style={styles.inputContYear}>
                        <Text style={styles.inputText}>
                            YYYY
                        </Text>
                        <TextInput style={styles.inputBoxDate}
                            placeholder='' underlineColorAndroid='transparent' placeholderTextColor='grey'
                            onChangeText={(y) => this.setState({year:y})}
                            value={this.state.year} />
                    </View>
                    
                </View>

                {this.renderInput('First Name', '', (a) => this.setState({firstName:a}), this.state.firstName)}
                {this.renderInput('Last Name', '', (a) => this.setState({lastName:a}), this.state.lastName)}
                {this.renderInput('Student Number', '', (a) => this.setState({stdNum:a}), this.state.stdNum)}
				
                </ScrollView>
                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Save' nav={() => this.saveChanges()} />
                    <DefaultButton title='Discard' nav={() => this.props.navigation.goBack()} />
                </View>
			</View>
		);
		}
	};