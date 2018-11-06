import { StyleSheet } from 'react-native';


export const staticStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0C2340',
    },
    title: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 36,
        color: 'white',
        //marginBottom: 10,
    },
    submitBtnCont: {
        //flex: 0.3,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
        alignContent: 'flex-start',
        justifyContent: 'flex-end',
    },
    blurbView: {
        flex:1,
        backgroundColor: '#0C2340',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20,
        marginBottom: 30,
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
        fontSize: 22,
    },
    image: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        resizeMode: 'center',
        padding: 5,
    },
    });