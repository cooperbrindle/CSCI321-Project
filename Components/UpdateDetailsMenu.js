

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, FlatList, View, TouchableHighlight, Image} from 'react-native';
import { DefaultButton } from './DefaultButton';
import { SocialButton } from './SocialButton';

const dashTmp = './assets/dashTmp.png';

export default class UpdateDetailsMenu extends Component {
	
	static navigationOptions = {
		title: 'Update Details',
		headerStyle: {
			backgroundColor: '#0C2340',
		},
		headerTintColor: 'white',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	}

	renderdashBtn(title, dir){
		return(
			<TouchableHighlight style={styles.dashBtn}
					onPress={() => this.props.navigation.navigate(dir)}>
				<View style={styles.dashBtnContainer}>
					<Image
                        style={styles.dashBtnImg}
                        source={require(dashTmp)}
                    />
					<Text style={styles.dashText}>
						{title}
					</Text>
				</View>
            </TouchableHighlight>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				
				<View style={styles.dashboard}>
					{this.renderdashBtn("Personal", 'PersonalDets')}
					{this.renderdashBtn("Contact", 'PersonalDets')}
				</View>
                <View style={styles.dashboard}>
					{this.renderdashBtn("Employment", 'PersonalDets')}
					{this.renderdashBtn("Subscriptions", 'PersonalDets')}
				</View>

                <View style={styles.socialContainer}>
                    <SocialButton title='Import from' nav={{}} />
                </View>

                <View style={styles.submitBtnCont}>
                    <DefaultButton title='Save Changes' nav={() => this.props.navigation.navigate('UDMenu')} />
                    <DefaultButton title='Discard Changes' nav={() => this.props.navigation.navigate('UDMenu')} />   
                </View>

			</View>
		);
		}
	};
	
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#0C2340',
		},

		/////////////////////////////////////////DASH BOARD
		dashboard: {
			flex: 1,
			flexDirection: 'row',
			marginLeft: 7,
			marginRight: 7,
			justifyContent: 'space-between',
		},
				dashBtn: {
					flex: 1,
					margin: 5,
					backgroundColor: 'white',
					justifyContent: 'center',
                    alignContent: 'center',
                    borderRadius: 2,
				},
				dashBtnContainer: {
					justifyContent: 'center',
					alignContent: 'center',
				},
						dashBtnImg: {
							width: 45,
							height: 45,
							alignSelf: 'center',
						},
						dashText: {
							color: '#0C2340',
							fontSize: 18,
							marginTop: 10,
							textAlign: 'center',
							alignSelf: 'center',
						},

		/////////////////////////////////////////SOCIAL STYLES
        socialContainer: {
            flex: 1,
            marginBottom: 30,
            marginLeft: 5,
            marginRight: 5,
            justifyContent: 'center',
        },

        /////////////////////////////////////////SUBMIT BUTTONS
        submitBtnCont: {
            flex: 1,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 10,
            alignContent: 'flex-start',
            justifyContent: 'flex-end',
        },
	});
