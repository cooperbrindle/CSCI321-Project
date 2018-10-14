

import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, View, TouchableHighlight, Image, ActivityIndicator, ScrollView} from 'react-native';
import { navigationOptionsFunc } from '../styles/navOptions';
import { baseStyles } from '../styles/BaseStyles';
import { listStyles } from '../styles/EventStyles'

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

    renderItem(item){
        return(
            <TouchableHighlight onPress={() => this.props.navigation.navigate('DiscountCard')}>
                <View style={listStyles.itemView}>
                    <Image
                        style={discountStyles.image}
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
	
	const discountStyles = StyleSheet.create({
        image: {
            backgroundColor: '#FFFFFF',
            flex: 1,
            resizeMode: 'center',
            padding: 5,
        },
	});