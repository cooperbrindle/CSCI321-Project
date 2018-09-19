import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, View, TouchableHighlight, ActivityIndicator, ScrollView, Image} from 'react-native';

import Vultrsdk from '../Vultrsdk';


export default class EventsList extends Component {
	constructor(props){
        super(props);
    }
    
	static navigationOptions = {
        title: 'Events',
		headerStyle: {
            backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
            
        },
    }
    
    state = {
        isLoading: true,
        errorMessage: '',
        data: null,
    }
    
    componentDidMount(){ 
        Vultrsdk.getEvents('events')
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
        var parts = item.startdate.split('/')
        var d = new Date(parts[2], parts[1]-1, parts[0]);
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        return(
            <TouchableHighlight onPress={() => this.props.navigation.navigate('EventSingle')}>
                <View style={styles.itemView}>
                    <View style={styles.textView}>
                        <Text style={styles.text}>
                            {item.eventname}
                        </Text>
                    </View>
                    <View style={styles.hlDate}>
                        <Text style={styles.hlDay}>
                            {parts[0]}
                        </Text>
                        <Text style={styles.hlMonth}>
                            {months[parts[1]-1]}
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
            <ScrollView style={styles.scrollView}>
                <FlatList style={styles.fList}
                    data={this.state.data}
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={(item, index) => index}
                />
            </ScrollView>
        )
    }
	render() {
		return (
			<View style={styles.container}>
                {this.renderActivityIndicator()}
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
            flex: 1,
        },
		itemView: {
            flexDirection: 'row',
            borderWidth: 0.5,
            //flex: 1,
        },
        image: {
            flex: 1,
            height: 140,
            resizeMode: 'contain',
        },
        textView: {
            flex: 2,
        },
        text: {
            color: 'white',
            fontSize: 18,
            paddingLeft: 20,
            paddingTop: 20,
            paddingRight: 10,
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