/////////////////////////////////////////
// CUSTOM SWITCH WRAPPER PROP
// Used for switches with custom colours etc..
////////////////////////////////////////

import React, { Component } from 'react';
import { Platform, Text, View, Switch} from 'react-native';

import { styles } from '../styles/FormStyles';

export class CustSwitch extends React.Component{

    static defaultProps = {
        disabled: false,

    }

    render() {
        return(
            <View style={styles.switchView}>
					<View style={styles.switchTextCont}>
						<Text style={styles.switchText}>
							{this.props.text}
						</Text>
					</View>
					<Switch
						value={this.props.value}
						onValueChange={this.props.onValueChange}
                        trackColor={{false:'#0047BB', true:'#0047BB'}}
                    />
				</View>
        )
    }
}

