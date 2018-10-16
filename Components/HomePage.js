/////////////////////////////////////////
// MAIN HOME PAGE
/////////////////////////////////////////

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Dimensions, ActivityIndicator} from 'react-native';

//styles
import { baseStyles } from './styles/BaseStyles';
import { homeStyles } from './styles/HomeStyles';
import {navigationOptionsFunc} from './styles/navOptions';

//custom props
import { DashButton } from './CustomProps/DashButton';
import { Logo } from './CustomProps/Logo';
import Carousel from 'react-native-snap-carousel';

//Button Icons
const updateDetailsIcon = require('./assets/UpdateDetails.png');
const outlookIcon = require('./assets/Outlook.png');
const eventsIcon = require('./assets/Events.png');
const promoIcon = require('./assets/Benefits.png');

export default class HomePage extends Component {
	
	//nav header
	static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Home', navigation, true);
	}
	
	//Navheader left button handler (toggle drawer nav menu)
	toggleSettings = () => {
		this.props.navigation.toggleDrawer();;
	}

	state = {
		isLoading: false,
		didLoad: false,
		highlightData: [],
		errorMessage: '',
	};

	componentDidMount(){
		this.props.navigation.setParams({toggleSettings: this.toggleSettings}) //bind handler function to header
		this.setState({isLoading: true, didLoad: false, highlightData: null});

		//Load Highlights carousel data
		try{
		var vultr = this.props.screenProps;
		vultr.getHighlights()
		.then(res => {
				this.setState({
					isLoading: false,
					highlightData: res,
					didLoad: true,
				});
		}).catch(err =>{
			this.setState({isLoading: false, didLoad: false, errorMessage: err});
		})
		}catch(err){console.warn('try catch: ' + err);
			this.setState({isLoading: false});}
	}

	//Render single highlight item
	renderHighlight({item, index}){
		///////////////////////////////////////////////	EVENT
		if(item.type == 'event'){
			var parts = item.data.startdate.split('/')
        	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			
			return (
				<TouchableHighlight style={homeStyles.highlightBtn}
					onPress={() => this.props.navigation.navigate('EventSingle', {eventData: item.data})}>
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

		///////////////////////////////////////////////	DISCOUNT
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

		///////////////////////////////////////////////	MAGAZINE ARTICLE
		if(item.type == 'mag')
			return (
				<TouchableHighlight style={homeStyles.highlightBtn}
						onPress={() => {this.props.navigation.navigate('WebViewPage', 
							{title: 'UOW Outlook Magazine', 
							link: item.data.link})
						}}>
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

	//Render Highlights carousel when data did load from server
	// SOURCE: https://github.com/archriss/react-native-snap-carousel
	renderCarousel(){
		if(this.state.isLoading || !this.state.didLoad) return (<View/>);
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

	//MAIN RENDER
	render() {
		const actInd = this.state.isLoading? <ActivityIndicator size='large' color='#cc0000'/> : <View style={homeStyles.carouselView}/>;
        
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
					<Text style={baseStyles.errorText}>{this.state.errorMessage}</Text>
					{this.renderCarousel()}
					<View style={baseStyles.activityView}>{actInd}</View>
				</View>
				
			</View>
		);
	}
};