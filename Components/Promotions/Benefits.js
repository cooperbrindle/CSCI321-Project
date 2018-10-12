

import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image} from 'react-native';
import { DashButton } from '../CustomProps/DashButton';
import { Logo } from '../CustomProps/Logo';

import { baseStyles } from '../styles/BaseStyles';
import { homeStyles, smallDashStyles } from '../styles/HomeStyles';

const Library = require('../assets/Library.png');
const Discounts = require('../assets/Discounts.png');
const Mentoring = require('../assets/Mentoring.png');
const Volunteering = require('../assets/Volunteering.png');
const Networking = require('../assets/Networks.png');
const Study = require('../assets/Study.png');
const ScholarshipsImg = require('../assets/Scholarships.png');
const Careers = require('../assets/Careers.png');

export default class BenefitsMenu extends Component {
	constructor(props){
		super(props);
	}
	
	static navigationOptions = {
		title: 'Benefits',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	}

	state = {
		vultr: this.props.screenProps,
		isLoading: true,
		didLoad: false,
		errorMessage: '',
		successMessage: '',
	};
	renderdashBtn(title, page, img, navOptions){
		return(
			<TouchableHighlight style={smallDashStyles.dashBtnSmall}
					onPress={() => this.props.navigation.navigate(page, navOptions)}>
				<View style={smallDashStyles.dashBtnContainerSmall}>
					<Image
                        style={smallDashStyles.dashBtnImgSmall}
                        source={img}
                    />
					<Text style={smallDashStyles.dashTextSmall}>
						{title}
					</Text>
				</View>
            </TouchableHighlight>
		)
	}

	render() {
		return (
			<View style={baseStyles.container}>
				<View style={baseStyles.logoCont}>
					<Logo scale={1} />
				</View>
				
				<View style={homeStyles.dashboard}>
					<DashButton title='Discounts Program' img={Discounts} nav={()=>this.props.navigation.navigate('Discounts', {})} />
					<DashButton title='Library Membership' img={Library} nav={()=>this.props.navigation.navigate('LibraryMem', {data: this.state.data})} />
				</View>
				<View style={homeStyles.dashboard}>
					<DashButton title='Career Support' img={Careers} nav={()=>this.props.navigation.navigate('Careers', {})} />
					<DashButton title='Networks & Groups' img={Networking} nav={()=>this.props.navigation.navigate('Networking', 
								{title: 'Networks and Groups',
								link: 'https://www.uow.edu.au/alumni/networks/index.html',})} />
				</View>

				<View style={smallDashStyles.dashboardSmall}>
					{this.renderdashBtn("Further Study", 'WebViewPage', Study, {
						title: 'Further Study',
						link: 'https://www.uow.edu.au/future/postgrad/index.html'
					} )}
					{this.renderdashBtn("Scholarships", 'WebViewPage', ScholarshipsImg, {
						title: 'Alumni Scholarships',
						link: 'https://www.uow.edu.au/alumni/benefits/postgrad/index.html',
					})}
					{this.renderdashBtn("Volunteer Opportunities", 'WebViewPage', Volunteering, {
						title: 'Volunteer Opportunities',
						link: 'https://www.uow.edu.au/alumni/benefits/volunteer/index.html',
					})}
					{this.renderdashBtn("Mentor Opportunities", 'WebViewPage', Mentoring, {
						title: 'Mentor Opportunities',
						link: 'https://www.uow.edu.au/alumni/benefits/mentoring/index.html',
					})}
				</View>

			</View>
		);
		}
	};
	
	