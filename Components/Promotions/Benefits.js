

import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image} from 'react-native';

//custom props
import { DashButton } from '../CustomProps/DashButton';
import { Logo } from '../CustomProps/Logo';

//styles
import { navigationOptionsFunc } from '../styles/navOptions';
import { baseStyles } from '../styles/BaseStyles';
import { homeStyles, smallDashStyles } from '../styles/HomeStyles';

///////////////////////////////////////////////////////////////////////////////////
//Declaration for all dash pictures
const Library = require('../assets/Library.png');
const Discounts = require('../assets/Discounts.png');
const Mentoring = require('../assets/Mentoring.png');
const Volunteering = require('../assets/Volunteering.png');
const Networking = require('../assets/Networks.png');
const Study = require('../assets/Study.png');
const ScholarshipsImg = require('../assets/Scholarships.png');
const Careers = require('../assets/Careers.png');

export default class BenefitsMenu extends Component {
	
	//Nav header
	static navigationOptions = ({navigation}) => {
		return navigationOptionsFunc('Benefits', navigation, false);
	}

	state = {
		vultr: this.props.screenProps,
		isLoading: true,
		didLoad: false,
		errorMessage: '',
		successMessage: '',
	};

	componentDidMount(){
		this.setState({urlList: this.props.navigation.getParam('urlList', [])})
	}

	//////////////////////////////////////////////////////////////////////////////////////////
	//Renders the display for dash buttons with a page redirect
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

	///////////////////////////////////////////////////////////////////////////////////////////////
	//Renders display
	render() {
		return (
			<View style={baseStyles.container}>
				<View style={baseStyles.logoCont}>
					<Logo scale={1} />
				</View>
				
				<View style={homeStyles.dashboard}>
					<DashButton title='Discounts Program' img={Discounts} nav={()=>this.props.navigation.navigate('Discounts', {card: false})} />
					<DashButton title='Library Membership' img={Library} nav={()=>this.props.navigation.navigate('LibraryMem', {data: this.state.data})} />
				</View>
				<View style={homeStyles.dashboard}>
					<DashButton title='Career Support' img={Careers} nav={() => this.props.navigation.navigate('WebViewPage',
                            {title: 'CareerHub',
							link: this.state.urlList.careers})} />
					
					<DashButton title='Networks & Groups' img={Networking} nav={()=>this.props.navigation.navigate('WebViewPage', 
								{title: 'Networks and Groups',
								link: this.state.urlList.networks,})} />
				</View>

				<View style={smallDashStyles.dashboardSmall}>
					{this.renderdashBtn("Further Study", 'WebViewPage', Study, {
						title: 'Further Study',
						link: this.state.urlList.study
					} )}
					{this.renderdashBtn("Scholarships", 'WebViewPage', ScholarshipsImg, {
						title: 'Alumni Scholarships',
						link: this.state.urlList.scholarships,
					})}
					{this.renderdashBtn("Volunteer Opportunities", 'WebViewPage', Volunteering, {
						title: 'Volunteer Opportunities',
						link: this.state.urlList.volunteering,
					})}
					{this.renderdashBtn("Mentor Opportunities", 'WebViewPage', Mentoring, {
						title: 'Mentor Opportunities',
						link: this.state.urlList.mentoring,
					})}
				</View>

			</View>
		);
		}
	};
	
	