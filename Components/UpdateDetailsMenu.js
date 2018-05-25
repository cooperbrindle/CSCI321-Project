

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, Button, FlatList, View, TouchableHighlight, Image} from 'react-native';

const dashTmp = './assets/dashTmp.png';
const fbLogo = './assets/fblogo.png';
const liLogo = './assets/lilogo.png';

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
                    <TouchableHighlight style={styles.socialBtnFB}
                        onPress={this._onPressButton}>
                        <View style={styles.socialBtnView}>
                            <Image
                                style={styles.socialImage}
                                source={require(fbLogo)}
                            />

                            <Text style={styles.socialText}>
                                Import from facebook
                            </Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.socialBtnLI}
                        onPress={this._onPressButton}>
                        <View style={styles.socialBtnView}>
                            <Image
                                style={styles.socialImage}
                                source={require(liLogo)}
                            />
                            
                            <Text style={styles.socialText}>
                                Import from Linkedin
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={styles.submitBtnCont}>
                    <TouchableHighlight style={styles.submitBtn}
                        onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={styles.submitBtnText}>
                                Save Changes
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.submitBtn}
                        onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={styles.submitBtnText}>
                                Reset
                        </Text>
                    </TouchableHighlight>
                        
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
        socialBtnFB: {
            height: 50,
            backgroundColor:'#3B5998',
            borderRadius:10,
            borderWidth: 1,
            justifyContent: 'center',
        },
        socialBtnLI: {
            height: 50,
            backgroundColor:'#0077B5',
            borderRadius:10,
            borderWidth: 1,
            justifyContent: 'center',
        },
        socialBtnView: {
            flex: 1,
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
        },
        socialImage: {
            position: 'absolute',
            marginLeft: 10,
            marginTop: 10,
            width: 30,
            height: 30,
            margin: 0,
            alignSelf: 'flex-start',
        },
        socialText: {
            flex: 1,
            color: 'white',
            fontWeight: 'bold',
            alignSelf: 'center',
            textAlign: 'center',
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
        submitBtn: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:5,
            backgroundColor:'#0C2340',
            height: 50,
            borderRadius:10,
            borderWidth: 2,
            borderColor: '#d9d9d6',
        },
        submitBtnText: {
            color: '#cc0000',
            fontWeight: 'bold',
        },
	});
