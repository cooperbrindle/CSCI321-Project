

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, FlatList, View, TouchableHighlight, Image, ActivityIndicator, ScrollView} from 'react-native';

import { EventSingle } from './EventSingle';
import { DashButton } from './DashButton';
import { Logo } from './discLogo';


const tmpImg = require('./assets/dashTmp.png');

const discountList = [
    {blurb: 'item description 1'},
    {blurb: 'item description 2'},
    {blurb: 'item description 3'},
    {blurb: 'item description 4'},
    {blurb: 'item description 5'},
    {blurb: 'item description 6'},
    {blurb: 'item description 7'},
];

export default class DiscountsList extends Component {
	constructor(props){
        super(props);
        state = {
            isLoading: true,
            errorMessage: '',
        }
	}
	static navigationOptions = {
		title: 'Discounts',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
			
		},
    }
    
    componentDidMount(){ 
        /*Vultrsdk.getDiscounts('UOW')
        .then((res) => {
            this.setState({data: res, isLoading: false, errorMessage: ''});

        }).catch((error) => {
            this.setState({isLoading: false, errorMessage: error.message});
        })
        */
    }

    renderActivityIndicator(){
        return this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View/>;
    }

    renderItem(item){
        return(
            <View style={styles.itemView}>
                 <Image
                    style={styles.image}
                    source={tmpImg}
                />
                <View style={styles.textView}>
                    <Text style={styles.text}>
                        {item.blurb}
                    </Text>
                </View>
            </View>
        )
    }
    renderList(){
        /*if(data == null)
            return <View/>;
        */
        return(
            <ScrollView style={styles.scrollView}>
                <FlatList style={styles.fList}
                    data={discountList}
                    renderItem={({item}) => this.renderItem(item)}
                />
            </ScrollView>
        )
    }
	render() {
		return (
			<View style={styles.container}>
				{this.renderList()}
			</View>
		);
		}
};
	
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#0C2340',
        },
        scrollView: {
            //flex: 1,
        },
        fList: {
            //flex: 1,
        },
		itemView: {
            flexDirection: 'row',
            borderWidth: 0.5,
            //flex: 1,
        },
        image: {
            flex: 1,
            height: 140,
            resizeMode: 'center',
        },
        textView: {
            flex: 2,
        },
        text: {
            color: 'white',
            fontSize: 18,
            paddingLeft: 20,
            paddingTop: 20,
        }
	});