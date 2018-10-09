

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Platform, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './carousel.style';
import SliderEntry from './SliderEntry';
import styles, { colors } from './index.style';
import { ENTRIES1 } from './Entries';

import { DashButton } from './CustomProps/DashButton';
import { Logo } from './CustomProps/Logo';

const updateDetailsIcon = require('./assets/UpdateDetails.png');
const outlookIcon = require('./assets/Outlook.png');
const eventsIcon = require('./assets/Events.png');
const promoIcon = require('./assets/Promotions.png');
const settingsIcon = require('./assets/Settings.png');

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;
export default class HomePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			slider1ActiveSlide: SLIDER_1_FIRST_ITEM
		};
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

	_renderItem ({item, index}) {
		return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
	}

	_renderItemWithParallax ({item, index}, parallaxProps) {
		return (
			<SliderEntry
			  data={item}
			  even={(index + 1) % 2 === 0}
			  parallax={true}
			  parallaxProps={parallaxProps}
			/>
		);
	}

	mainExample (number, title) {
		const { slider1ActiveSlide } = this.state;

		return (
			<View style={styles.exampleContainer}>
				<Text style={styles.title}>{`Example ${number}`}</Text>
				<Text style={styles.subtitle}>{title}</Text>
				<Carousel
				  ref={c => this._slider1Ref = c}
				  data={ENTRIES1}
				  renderItem={this._renderItemWithParallax}
				  sliderWidth={sliderWidth}
				  itemWidth={itemWidth}
				  hasParallaxImages={true}
				  firstItem={SLIDER_1_FIRST_ITEM}
				  inactiveSlideScale={0.94}
				  inactiveSlideOpacity={0.7}
				  // inactiveSlideShift={20}
				  containerCustomStyle={styles.slider}
				  contentContainerCustomStyle={styles.sliderContentContainer}
				  loop={true}
				  loopClonesPerSide={2}
				  autoplay={true}
				  autoplayDelay={500}
				  autoplayInterval={3000}
				  onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
				/>
				<Pagination
				  dotsLength={ENTRIES1.length}
				  activeDotIndex={slider1ActiveSlide}
				  containerStyle={styles.paginationContainer}
				  dotColor={'rgba(255, 255, 255, 0.92)'}
				  dotStyle={styles.paginationDot}
				  inactiveDotColor={colors.black}
				  inactiveDotOpacity={0.4}
				  inactiveDotScale={0.6}
				  carouselRef={this._slider1Ref}
				  tappableDots={!!this._slider1Ref}
				/>
			</View>
		);
	}

	get gradient () {
		return (
			<LinearGradient
			  colors={[colors.background1, colors.background2]}
			  startPoint={{ x: 1, y: 0 }}
			  endPoint={{ x: 0, y: 1 }}
			  style={styles.gradient}
			/>
		);
	}
	toggleSettings = () => {
		this.props.navigation.toggleDrawer();;
	}

	componentDidMount(){
		this.props.navigation.setParams({toggleSettings: this.toggleSettings})
	 }

	render() {
		const example1 = this.mainExample(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');
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
				<SafeAreaView style={styles.safeArea}>
					<View style={styles.container}>
						<StatusBar
						translucent={true}
						backgroundColor={'rgba(0, 0, 0, 0.3)'}
						barStyle={'light-content'}
						/>
						{ this.gradient }
						<ScrollView
						style={styles.scrollview}
						scrollEventThrottle={200}
						directionalLockEnabled={true}
						>
							{ example1 }
						</ScrollView>
					</View>
				</SafeAreaView>
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
		settings: {
			//resizeMode: 'center'
		},
		
		/////////////////////////////////////////DASH BOARD
		dashboard: {
			flex: 1,
			flexDirection: 'row',
			marginLeft: 7,
			marginRight: 7,
			justifyContent: 'space-between',
		},
	});