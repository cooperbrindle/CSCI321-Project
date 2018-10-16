

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
    
    componentDidMount(){ 
        this.props.screenProps.getDiscounts('category')
        .then((res) => {
            this.setState({data: res, isLoading: false, errorMessage: ''});

        }).catch((error) => {
            console.warn(error);
            this.setState({isLoading: false, errorMessage: error});
        })
    }

    renderActivityIndicator(){
        return this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View/>;
    }

    setModalVisible(value) {
        this.setState({modalVisible: value});
    }

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
        else{
            return(
                <TouchableHighlight onPress={() => this.props.navigation.navigate('DiscountCard')}>
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
    renderList(){
        if(this.state.isLoading)
            return <View/>;
        
        else return(
            <ScrollView style={listStyles.scrollView}>
                <FlatList style={listStyles.fList}
                    data={this.state.data}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={(item, index) => index}
                />
            </ScrollView>
        )
    }
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