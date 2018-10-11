import React from 'react';
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0C2340',
    },

    /////////////////////////////////////////
    title: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 28,
        color: 'white',
        marginBottom: 10,
    },

    /////////////////////////////////////////Containers
    topInput: {
        flexDirection: 'row',
        marginRight: 5,
        marginLeft: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    dateCont: {
        flexDirection: 'row',
    },

    inputCont: {
        flexDirection: 'column',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    inputContSmall: {
        flex: 4,
        flexDirection: 'column',
        marginRight: 60,
    },
    inputContDate: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
    },
    inputContYear: {
        flex: 2,
        flexDirection: 'column',
        marginLeft: 10,
    },

    //////////////////////////////////////////Inputs
    inputText: {
        alignSelf: 'flex-start',
        textAlign: 'right',
        fontSize: 18,
        color: 'white',
    },
    inputBox: {
        color: 'grey',
        paddingLeft: 10,
        backgroundColor:'#d9d9d6',
        height: 50,
        borderRadius:5,
    },
    inputBoxSmall: {
        color: 'grey',
        paddingLeft: 10,
        backgroundColor:'#d9d9d6',
        height: 50,
        borderRadius:5,
    },
    inputBoxDate: {
        color: 'grey',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor:'#d9d9d6',
        height: 50,
        borderRadius:5,
    },

    /////////////////////////////////////////SUBMIT BUTTONS
    submitBtnCont: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
        alignContent: 'flex-start',
        justifyContent: 'flex-end',
    },
    
});