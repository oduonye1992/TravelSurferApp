import React, { Component } from 'react';
import {WebView,TouchableHighlight,  Text, View, ActivityIndicator, Platform, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import store from '../../store/store';

export default class WebViewComponent extends Component {
    constructor (props){
        super(props);
        this.state = {
            applet : {},
            isLoading : true,// true
            page_is_loaded : false,
            parent : store.getState(),
            appletRoot : 'https://oduonye1992.github.io'//https://a9cc3d23.ngrok.io'
        }
    }
    renderCloseButton(){
        return (
            <TouchableHighlight
                underlayColor="#ecf0f1"
                onPress={() => {
                    requestAnimationFrame(() => {
                        Actions.pop();
                    });
                }}>
                <View style={{backgroundColor:'#2c3e50', alignItems:'center', justifyContent:'center', height:40}}>
                    <Icon name="ios-close-outline" size={30} color="white" />
                </View>
            </TouchableHighlight>
        );
    }
    render(){
        return (
            <View style={{flex:1}}>
                <Text style={{height:20, backgroundColor:'#ecf0f1'}}>.</Text>
                <TouchableHighlight
                    underlayColor="#ecf0f1"
                    onPress={() => {
                        requestAnimationFrame(function(){
                            Actions.pop();
                        });
                    }}
                >
                    <View style={{backgroundColor:'#ecf0f1', alignItems:'center', justifyContent:'center', height:30}}>
                        <Icon name="ios-close-outline" size={35} color="#e74c3c" />
                    </View>
                </TouchableHighlight>
                <WebView
                    ref="webviewbridge"
                    source={{url : this.props.url}} />
            </View>
        );
    }
}
