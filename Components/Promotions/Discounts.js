

import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, View, TouchableHighlight, Image, ActivityIndicator, ScrollView, Modal, Alert} from 'react-native';
import { navigationOptionsFunc } from '../styles/navOptions';
import { baseStyles } from '../styles/BaseStyles';
import { listStyles } from '../styles/EventStyles';
import { staticStyles } from '../styles/BenefitsStyles';
const disCard = require('../assets/discPage.png');



export default class Discounts extends Component {
	constructor(props){
        super(props);
    }
    
	static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Discounts', navigation, false);
	}
    
    state = {
        isLoading: true,
        errorMessage: '',
        data: null,
        modalVisible: false,
    }
    
    //////////////////////////////////////////////////////////////////////////////////
    //Calls the getDiscounts function in the Vultrsdk, then loads the data into this.state
    componentDidMount(){ 
        this.setState({isLoading: true, modalVisible: this.props.navigation.getParam('card', false)});
        this.props.screenProps.getDiscounts('category')
        .then((res) => {
            this.setState({data: res, isLoading: false, errorMessage: ''});

        }).catch((error) => {
            console.warn(error);
            this.setState({isLoading: false, errorMessage: error});
        })
    }

    /////////////////////////////////////////////////////////////////////
    //Loading wheel
    renderActivityIndicator(){
        return this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View/>;
    }

    ////////////////////////////////////////////////////////////////////////////
    //Sets the discount card to visible or not
    setModalVisible(value) {
        this.setState({modalVisible: value});
    }

    //////////////////////////////////////////////////////////////////////////
    //Renders each discount (item) and loads a different view based on type
    renderItem(item){
        if(item.discountType == 'card'){
            return(
                <TouchableHighlight onPress={ () => {this.setModalVisible(true);}}>
                    <View style={listStyles.itemView}>
                        <Image
                            style={staticStyles.image}
                            source={{uri: item.imageURL}}
                        />
                        <View style={listStyles.textView}>
                            <Text style={listStyles.text}>
                                {item.blurb}
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        }
        if(item.discountType == 'link'){
            return(
                <TouchableHighlight onPress={() => this.props.navigation.navigate('WebViewPage', 
                    {title: item.displayName, 
                    link: item.link})}>
                    <View style={listStyles.itemView}>
                        <Image
                            style={staticStyles.image}
                            source={{uri: item.imageURL}}
                        />
                        <View style={listStyles.textView}>
                            <Text style={listStyles.text}>
                                {item.blurb}
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        }  
        else{
            return(
                <TouchableHighlight onPress={() => this.props.navigation.navigate('WebViewPage', 
                    {title: item.displayName, 
                    link: item.link})}>
                    <View style={listStyles.itemView}>
                        <Image
                            style={staticStyles.image}
                            source={{uri: item.imageURL}}
                        />
                        <View style={listStyles.textView}>
                            <Text style={listStyles.text}>
                                {item.blurb}
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        }  
    }

    ///////////////////////////////////////////////////////////////////////////////////
    //Renders the list items
    renderList(){
        if(this.state.isLoading)
            return <View/>;
        
        else return(
            <ScrollView style={listStyles.scrollView}>
                <FlatList style={listStyles.fList}
                    data={this.state.data}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor = { (item, index) => index.toString() }
                />
            </ScrollView>
        )
    }

    //////////////////////////////////////////////////////////////////////////////////////////
    //Modal View and calls to renderList is here
	render() {
		return (
            <View style={baseStyles.container}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                    Alert.alert('Congratulations!');
                    }}>
                    <View style={modalStyle.container}>
                        <TouchableHighlight style={modalStyle.touch}
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Image style={modalStyle.image} source={disCard}/>
                        </TouchableHighlight>
                    </View>
                </Modal>
                {this.renderActivityIndicator()}
                {this.renderList()}
			</View>
		);
		}
};

/////////////////////////////////////////////////////////////////////////////////////
//Styling for discount card modal
const modalStyle = StyleSheet.create({
    image: {
        resizeMode: 'stretch',
        position: 'absolute',
        width: '70%',
        height: '70%',
        alignSelf: 'center',
    },
    touch: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    container: {
        flex: 1,
        
        
    },
})