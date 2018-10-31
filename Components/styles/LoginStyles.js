import { StyleSheet } from 'react-native';


export const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0C2340',
    },

    logoCont: {
        marginTop: 50,
        flex: 2,
    },
    
    errorText: {color: 'red', fontFamily: 'Verdana',},

    activityView: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    /////////////////////////////////////////INPUT STYLES
    inputContainer: {
        flex: 2.5,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 60,
        alignContent: 'flex-start',
    },
    inputBox: {
        alignItems: 'center',
        color: 'grey',
        marginBottom: 0,
        marginTop: 0,
        paddingLeft: 10,
        backgroundColor:'#d9d9d6',
        height: 50,
        borderRadius:5,
        borderWidth: 1,
    },

    /////////////////////////////////////////SOCIAL STYLES
    socialContainer: {
        flex: 1,
        marginBottom: 30,
        marginLeft: 5,
        marginRight: 5,
    },

    /////////////////////////////////////////FORGOT STYLES
    forgotView: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
    },
    forgotText: {
        fontFamily: 'Verdana',
        color: '#0047BB',
        fontSize: 14,
        alignSelf: 'center',
        paddingTop: 20,
    }
});