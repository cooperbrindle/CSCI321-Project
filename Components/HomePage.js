

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Dimensions, ActivityIndicator} from 'react-native';

import { baseStyles } from './styles/BaseStyles';
import { DashButton } from './CustomProps/DashButton';
import { Logo } from './CustomProps/Logo';
import Carousel from 'react-native-snap-carousel';

const updateDetailsIcon = require('./assets/UpdateDetails.png');
const outlookIcon = require('./assets/Outlook.png');
const eventsIcon = require('./assets/Events.png');
const promoIcon = require('./assets/Promotions.png');
const settingsIcon = require('./assets/Settings.png');

export default class HomePage extends Component {
	constructor(props){
		super(props);
		this.highlightData = [
			{a:'Hey C0op3r'},
			{a:'h4y AYM33'},
			{a:'Im tired'},
			{a:'but sn4kz'},
		];
	}

	static navigationOptions = ({navigation}) => {
		return {
		title: 'Home',
		headerStyle: {
			backgroundColor: '#0C2340',
			
		},
		headerTintColor: 'white',
		headerRight: (
			<TouchableHighlight 
				onPress={navigation.getParam('toggleSettings')}
			>
				<Image source={settingsIcon}
					style={{resizeMode: 'contain', width: 40, height: 40 }}
				/>
			</TouchableHighlight>	
		),
	}};//width: 40, height: 40

	toggleSettings = () => {
		this.props.navigation.toggleDrawer();;
	}

	state = {isLoading: false, highlightData: []};

	componentDidMount(){
		this.props.navigation.setParams({toggleSettings: this.toggleSettings})

		this.setState({isLoading: true, highlightData: null});
		var vultr = this.props.screenProps;
		vultr.getHighlights()
		.then(res => {
				console.log(res);
				this.setState({
					isLoading: false,
					highlightData: res,
				});
		}).catch(err =>{
			this.setState({isLoading: false});
		})
	}

	
	renderHighlight({item, index}){
		if(item.type == 'event'){
			console.log('rendering event');
			var parts = item.data.startdate.split('/')
        	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

			return (
				<TouchableHighlight style={homeStyles.highlightBtn}
					onPress={(item) => this.props.navigation.navigate('EventSingle', {data: item.data})}>
                <View style={homeStyles.highlightView}>
                    <View style={homeStyles.highlightTextView}>
                        <Text style={homeStyles.highlightText}>
                            {item.data.eventname}
                        </Text>
                        <Text style={homeStyles.highlightBlurb}>
                            {item.data.blurb}
                        </Text>
                    </View>
                    <View style={homeStyles.hlDate}>
                        <Text style={homeStyles.hlDay}>
                            {parts[0]}
                        </Text>
                        <Text style={homeStyles.hlMonth}>
                            {months[parts[1]-1]}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
			);
		}if(item.type == 'discount')
			return (
				<TouchableHighlight style={homeStyles.highlightBtn}
					onPress={() => this.props.navigation.navigate('DiscountCard')}>
                <View style={homeStyles.highlightView}>
                    <Image
                        style={homeStyles.discImage}
                        source={{uri: item.data.imageURL}}
                    />
                    <View style={homeStyles.highlightTextView}>
                        <Text style={homeStyles.highlightText}>
                            {item.data.blurb}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
			);
		if(item.type == 'mag')
			return (
				<TouchableHighlight style={homeStyles.highlightBtn}
						onPress={(item) => {}}>
					<View style={homeStyles.highlightView}>
						<View style={homeStyles.highlightTextView}>
							<Text style={homeStyles.highlightText}>
								{item.data.title}
							</Text>
							<Text style={homeStyles.highlightBlurb}>
								{item.data.desc}
							</Text>
						</View>
						
					</View>
				</TouchableHighlight>
			);
	}

	renderCarousel(){
		if(this.state.isLoading) return (<View/>);
		else 
			return (
				<Carousel
					ref={(c) => {this.carousel = c}}
					data={this.state.highlightData}
					renderItem={this.renderHighlight}
					layout={'default'}
					sliderWidth={Dimensions.get('window').width}
					itemWidth={Dimensions.get('window').width/1.2}
				/>
			);
	}

	render() {
		const actInd = this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View style={homeStyles.carouselView}/>;
        
		return (
			<View style={homeStyles.container}>
				<View style={homeStyles.logoCont}>
					<Logo scale={1} />
				</View>

				<View style={homeStyles.dashboard}>
					<DashButton title='Update Details' img={updateDetailsIcon} nav={()=>this.props.navigation.navigate('UDMenu')} />
					<DashButton title='Outlook' img={outlookIcon} nav={()=>this.props.navigation.navigate('OutlookMag')} />
				</View>

				<View style={homeStyles.dashboard}>
					<DashButton title='Events' img={eventsIcon} nav={()=>this.props.navigation.navigate('EventsList')} />
					<DashButton title='Benefits' img={promoIcon} nav={()=>this.props.navigation.navigate('Benefits')} />
				</View>

				<Text style={homeStyles.carouselTitle}>
					Highlights
				</Text>
				<View style={homeStyles.carouselView}>
					{this.renderCarousel()}
					{actInd}
				</View>
				
			</View>
		);
	}
};
	
	const homeStyles = StyleSheet.create({
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