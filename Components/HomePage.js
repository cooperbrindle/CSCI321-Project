

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Dimensions, ActivityIndicator} from 'react-native';

import { baseStyles } from './styles/BaseStyles';
import { homeStyles } from './styles/HomeStyles';
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
				//console.log(res);
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
			var parts = item.data.startdate.split('/')
        	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			
			return (
				<TouchableHighlight style={homeStyles.highlightBtn}
					onPress={() => this.props.navigation.navigate('EventSingle', {data: item.data})}>
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
								{item.data.description}
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
					renderItem={this.renderHighlight.bind(this)}
					layout={'default'}
					sliderWidth={Dimensions.get('window').width}
					itemWidth={Dimensions.get('window').width/1.2}
				/>
			);
	}

	render() {
		const actInd = this.state.isLoading ? <ActivityIndicator size='large' color='#cc0000'/> : <View style={homeStyles.carouselView}/>;
        
		return (
			<View style={baseStyles.container}>
				<View style={baseStyles.logoCont}>
					<Logo scale={1} />
				</View>

				<View style={homeStyles.dashboard}>
					<DashButton title='Update Details' img={updateDetailsIcon} nav={()=>this.props.navigation.navigate('UDMenu')} />
					<DashButton title='Outlook' img={outlookIcon} nav={
						()=>this.props.navigation.navigate('WebViewPage', 
								{title: 'UOW Outlook Magazine', 
								link: 'https://www.uow.edu.au/alumni/outlook/index.html'})
						} />
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