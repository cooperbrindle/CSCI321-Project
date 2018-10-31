/////////////////////////////////////////
// CUSTOM FORM TEXT INPUT WITH TITLE
// Used for any text inputs
////////////////////////////////////////

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput} from 'react-native';

import { styles } from '../styles/FormStyles';

export class FormInput extends React.Component{

    static defaultProps = {
        placeholder: '',
        secureTextEntry: false,
        value: '',
        editable: true,
        autoCapitalize: 'sentences',
        keyboardType: 'default',
        maxLength: 200,
        clearButtonMode: 'while-editing',
    }

    render() {
        var inputStyle;
        if(this.props.editable) inputStyle = styles.inputBox;
        else inputStyle = styles.inputBoxUneditable;
        return(
			<View style={styles.inputCont}>
                <Text style={styles.inputText}>
                    {this.props.title}
                </Text>
                <TextInput style={inputStyle}
                    placeholder={this.props.placeholder}
                    underlineColorAndroid='transparent' 
                    placeholderTextColor='grey'
                    onChangeText={this.props.onChangeText} 
                    secureTextEntry={this.props.secureTextEntry}
                    value={this.props.value} 
                    editable={this.props.editable} 
                    autoCapitalize={this.props.autoCapitalize}
                    keyboardType={this.props.keyboardType}
                    maxLength={this.props.maxLength}
                    clearButtonMode={this.props.clearButtonMode}
                />
            </View>
		);
    }
}