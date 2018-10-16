

import React, { Component } from 'react';
import { Text, FlatList, View, TouchableHighlight, Image, ActivityIndicator, ScrollView} from 'react-native';
import { navigationOptionsFunc } from '../styles/navOptions';
import { baseStyles } from '../styles/BaseStyles';
import { listStyles } from '../styles/EventStyles'
import { staticStyles } from '../styles/BenefitsStyles';
import Overlay from 'react-native-modal-overlay';

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

    overlayFunc(){
        <Overlay visible={this.state.modalVisible}
            closeOnTouchOutside animationType="zoomIn"
            containerStyle={{backgroundColor: 'rgba(37, 8, 10, 0.78)'}}
            childrenWrapperStyle={{backgroundColor: '#eee'}}
            animationDuration={500}>
            <Text>Some Modal Content</Text>
        </Overlay>
    }

    renderItem(item){
        var option;
        if(item.discountType == 'card'){
            option = this.overlayFunc();
        }
        else {
            option = this.props.navigation.navigate('DiscountCard');
        }
        return(
            <TouchableHighlight onPress={() => {option}}>
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
                {this.renderActivityIndicator()}
				{this.renderList()}
			</View>
		);
		}
};