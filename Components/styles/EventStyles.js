import { StyleSheet } from 'react-native';


export const listStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0C2340',
    },
    scrollView: {
        //flex: 1,
    },
    fList: {
        flex: 1,
    },
    itemView: {
        flexDirection: 'row',
        borderWidth: 1,
        backgroundColor: '#ffffff',
        margin: 5,
        borderColor: 'white',
        height: 100,
    },
    textView: {
        flex: 2,
    },
    text: {
        color: 'black',
        fontSize: 18,
        paddingLeft: 20,
        paddingTop: 10,
        paddingRight: 10,
    },
    textBlurb: {
        color: 'black',
        textAlign: 'center',
        fontSize: 12,
        paddingLeft: 20,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
    },
    hlBtn: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'white',
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    hlBtnView: {
        flex: 1,
        flexDirection: 'row',
    },
            hlCont: {
                flex: 2.5,
                padding: 20,
            },
                    hlTitle: {
                        fontSize: 24,
                        color: '#0C2340',
                        //margin: 30,
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
});


export const eventStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d9d9d6',
    },
    /////////////////////////////////////////HEADING
    heading: {
        flex: .5,
        flexDirection: 'row',
        backgroundColor: '#0C2340',
        marginBottom: 10,
        padding: 5,
        justifyContent: 'center',
    },
        headTitle: {
            fontSize: 24,
            color: 'white',
            textAlign: 'center',
            alignSelf: 'center',
        },

    /////////////////////////////////////////EVENT INFO
    infoCont: {
        flex: 3,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#0C2340',
    },
        rowCont: {
            flexDirection: 'row',
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingLeft: 15,
            paddingTop: 10,
            paddingBottom: 10,
            marginLeft: 10,
            marginRight: 10,
        },
            infoTitle: {
                flex: 1,
                fontSize: 24,
                color: 'black',
                justifyContent: 'center',
                textAlignVertical: 'top',
                alignSelf: 'center',
            },
            infoText: {
                flex: 2,
                fontSize: 18,
                color: 'black',
                justifyContent: 'center',
                textAlignVertical: 'center',
                alignSelf: 'center',
            },
            blurbText: {
                flex: 2,
                fontSize: 18,
                paddingTop: 10,
                paddingLeft: 15,
                color: 'black',
                justifyContent: 'center',
                textAlignVertical: 'center',
                alignSelf: 'center',
            },
    mapCont: {
        flex: 1,
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
        map: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        },
    /////////////////////////////////////////REGISTER
    submitBtnCont: {
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        alignContent: 'flex-start',
        justifyContent: 'flex-end',
    },
});