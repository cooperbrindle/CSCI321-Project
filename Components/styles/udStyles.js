import { StyleSheet } from 'react-native';


export const udStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0C2340',
    },

    errorView: {
        backgroundColor: 'red',
    },

    errorText: {
        color: 'white',
    },

    /////////////////////////////////////////DASH BOARD
    dashboard: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 7,
        marginRight: 7,
        justifyContent: 'space-between',
    },

    /////////////////////////////////////////SOCIAL STYLES
    socialContainer: {
        flex: 1,
        marginBottom: 30,
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center',
    },

    /////////////////////////////////////////SUBMIT BUTTONS
    submitBtnCont: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
        alignContent: 'flex-start',
        justifyContent: 'flex-end',
    },
});