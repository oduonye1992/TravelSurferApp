import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Hr from '../lib/hr';

export default class ListItemSingle extends Component{
    constructor (props) {
        super(props);
    }
    render(){
        return (
            <View>
                <TouchableHighlight
                    underlayColor="#ecf0f1"
                    onPress={() => {
                        requestAnimationFrame(() => {
                            this.props.onClicked(this.props.text);
                        });
                    }}
                >
                    <View style={{flexDirection : 'row', padding : 10, alignItems:'center'}}>
                        <Image source={{uri: this.props.text.image}}
                               style={{width: 40, height: 40, borderRadius:5}} />
                        <View style={{marginLeft:10}}>
                            <Text
                                style={{
                                    fontFamily: 'Avenir Next',
                                    fontSize : 15,
                                    width:400,
                                    color : this.props.color
                                }}
                            >{this.props.text.name}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'Avenir Next',
                                    fontSize : 15,
                                    width:400,
                                    color : 'grey'
                                }}
                            >{this.props.text.country.title}
                            </Text>
                        </View>
                    </View>

                </TouchableHighlight>
                <Hr lineColor='#ecf0f1' width="100"/>
                </View>
        );
    }
}
const styles = StyleSheet.create({

    infoDescription: {
        fontFamily: 'AvenirNext-Medium',
        color : 'white',
        backgroundColor: 'transparent',
        fontSize : 12,
        marginTop : 14
    }
});