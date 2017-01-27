/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry, Text, StyleSheet, Platform} from 'react-native';
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux'
import CalenderComponent from './routes/form/calender';
// New Designs
import HomeComponent from './routes/newdesign/home';
import FormsComponent from './routes/newdesign/form';
import OrdersComponent from './routes/newdesign/orders';
import OrderDetailComponent from './routes/newdesign/order_detail';
import WalkthroughComponent from './routes/newdesign/walkthrough';
import AirportComponent from './routes/newdesign/airports';
import ConfirmationComponent from './routes/newdesign/confirmation';
import OptionalEmailComponent from './routes/newdesign/optionalemail';
import Drawer from 'react-native-drawer';
import codePush from "react-native-code-push";
import store from './store/store';
import HeaderComponent from './components/header';
import OneSignal from 'react-native-onesignal';

export default class TravelSurfer extends Component {
    constructor(props){
        super(props);
        this.state = {
            parent : store.getState()
        }
    }
    componentDidMount(){
        this.subscribe();
        this.configureNotification();
    }
    subscribe(){
        let that = this;
        store.subscribe(function() {
            // Update your views here
            that.setState({
                parent : store.getState()
            });
        })
    }
    configureNotification(){
        OneSignal.configure({
            onIdsAvailable: function(device) {
                console.log('UserId = ', device.userId);
                console.log('PushToken = ', device.pushToken);
            },
            onNotificationReceived: function(notification) {
                alert("notification received: ", notification);
            },
            onNotificationOpened: function(openResult) {
                console.log('MESSAGE: ', openResult.notification.payload.body);
                console.log('DATA: ', openResult.notification.payload.additionalData);
                console.log('ISACTIVE: ', openResult.notification.isAppInFocus);
                console.log('openResult: ', openResult);
                // Do whatever you want with the objects here
                // _navigator.to('main.post', data.title, { // If applicable
                //  article: {
                //    title: openResult.notification.payload.body,
                //    link: openResult.notification.payload.launchURL,
                //    action: data.openResult.notification.action.actionSelected
                //  }
                // });
            }
        });
    }
    render() {
        const drawerStyles = {
            drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
            main: {paddingLeft: 3}
        };
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                openDrawerOffset={100}
                type="static"
                tapToClose={true}
                open = {this.state.parent.drawerOpen}
                styles={drawerStyles}
                content={<HeaderComponent />}
                tweenHandler={Drawer.tweenPresets.parallax}
            >
                <Router>
                <Scene key="walkthrough" component={WalkthroughComponent} hideNavBar={true} title="Form"/>
                <Scene key="internetorderlist" component={OrdersComponent} hideNavBar={true} title="Form"/>
                <Scene key="choosehotel" component={HomeComponent} hideNavBar={true} title="Form"/>
                <Scene key="openform" component={FormsComponent} hideNavBar={true} title="Form"/>
                <Scene key="internetorderdetail" component={OrderDetailComponent} hideNavBar={true} title="Form"/>
                <Scene key="chooseairports" component={AirportComponent} hideNavBar={true} title="Form"/>
                <Scene key="confirmation" component={ConfirmationComponent} hideNavBar={true} title="Form"/>
                <Scene key="addemail" component={OptionalEmailComponent} hideNavBar={true} title="Form"/>
                <Scene key="calender" component={CalenderComponent} hideNavBar={true} title="Form"/>
            </Router>
            </Drawer>
        )
    }
}

let style = StyleSheet.create({
    tabBarStyle: {
        borderTopWidth : .5,
        borderColor    : '#b7b7b7',
        backgroundColor: 'white',
        opacity        : 1
    },
    navigationBarStyle  : {
        backgroundColor:'transparent',
        borderColor:'transparent'
    },
    titleStyle : {
        color : 'white'
    },
    iconStyle : {
        color:'red'
    }
});
const deploymentKey = 'woKC8lUCFrcQgYHhyh1tJNFDFcIhNJS-h1V4M'; // Platform.OS === 'ios' ? 'gW-vX1IiuEdteLWjcsTE_WqpuzrxNJS-h1V4M ' : 'dIQukamQjk_NrMoHi8FMx-rahYR8NJS-h1V4M ';
let codePushOptions = {updateDialog: true, checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, deploymentKey: deploymentKey };
TravelSurfer = codePush(codePushOptions)(TravelSurfer);
AppRegistry.registerComponent('TravelSurfer', () => TravelSurfer);
// iphone
// 0706 430 3773
// Ada
// 0816 016 9561
