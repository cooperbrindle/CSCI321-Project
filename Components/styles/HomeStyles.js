import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0C2340',
    },

    /////////////////////////////////////////LOGO
    logoCont: {
        flex: 1,
        marginBottom: 15,
    },
    
    /////////////////////////////////////////DASH BOARD
    dashboard: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 7,
        marginRight: 7,
        justifyContent: 'space-between',
    },

    /////////////////////////////////////////CAROUSEL
    carouselTitle: {
        fontSize: 28,
        color: 'white',
        marginLeft: 12,
        marginTop: 10,
    },
    carouselView: {
        flex: 1.2,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
    },
    
    
    highlightBtn: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 2,
    },
    highlightView: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        backgroundColor: '#ffffff',
        margin: 5,
        borderColor: 'white',
    },
    

    //////////////////////////////
    //////////////////////////////
    highlightTextView: {
        flex: 2,
    },
    highlightText: {
        color: 'black',
        fontSize: 18,
        paddingLeft: 20,
        paddingTop: 10,
        paddingRight: 10,
    },
    highlightBlurb: {
        color: 'black',
        textAlign: 'center',
        fontSize: 12,
        paddingLeft: 20,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
    },
    
    hlDate: {
        flex: 1,
        backgroundColor: '#0C2340',
        justifyContent: 'center',
    },
    hlDay: {
        fontSize: 36,
        textAlign: 'center',
        color: 'white',
        margin: 0,
    },
    hlMonth: {
        fontSize: 18,
        textAlign: 'center',
        color: '#cc0000',
        margin: 0,
    },

    ////////////////////////////////
    ////////////////////////////////
    discImage: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        resizeMode: 'center',
    },
});