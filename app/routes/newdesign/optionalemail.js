import React, { Component } from 'react';
import { Text, StyleSheet, AsyncStorage, ListView, View, Image, ScrollView, TouchableHighlight, TextInput } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import {Actions} from 'react-native-router-flux';
import store from "../../store/store";
import QueryBuilder from '../../config/settings';
import DeviceInfo from 'react-native-device-info';
var moment = require('moment');

export default class OptionalEmailComponent extends Component {
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    constructor (props){
        super(props);
        this.state = {}
    }
    validate(data, rules){
        for (let i = 0; i < rules.length; i++){
            if (!data[rules[i]]){
                alert(rules[i] + ' is not defined');
                throw new Error(rules[i] + ' is not defined');
            }
        }
    }
    async saveEmail(email){
        await AsyncStorage.setItem('email', email);
    }
    saveForm(){
        // Prepare the data
        let application = store.getState().application;
        let roomKey = Object.keys(application.room_type);
        let data = {
                hotel_id: application.hotel.id,
                airport_id: application.airport.id,
                start_date: application.start_date,
                end_date: application.end_date,
                room_type: application.room_type[roomKey],
                boarding: application.boarding == "Yes",
                adults: application.num_of_grown_up,
                children: application.num_of_children,
                email: application.email,
                transport: application.transport_from_airport_to_hotel == "Yes",
                uuid: DeviceInfo.getUniqueID()
            };
            this.validate(data, [
                'hotel_id',
                'airport_id',
                'start_date',
                'end_date',
                'room_type',
                'boarding',
                'transport',
                'adults',
                'children',
                'uuid'
            ]);
        fetch(QueryBuilder.endpoint+'search_order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((data) => {
                alert(JSON.stringify(data));
                this.saveEmail(application.email);
                Actions.confirmation();
            })
            .catch((err) => {
                alert(err.message + ' | ' + JSON.stringify(err));
            });
        // Send data

    }
    render(){
        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Button
                        onPress={() =>{
                            requestAnimationFrame(function(){
                                Actions.pop();
                            })
                        }}
                        transparent>
                        <Icon name='md-arrow-back' style={styles.colorWhite}/>
                    </Button>
                    <Title style={[styles.colorWhite, styles.fontAvenir]}>TRAVEL SURFER</Title>
                    <Button transparent >
                        <Icon name='md-add' style={styles.colorWhite}/>
                    </Button>
                </Header>
                <Content style={styles.content}>
                    <View style={{alignItems:'center', justifyContent:'flex-end', marginTop:200, padding:30}}>
                        <TextInput
                            keyboardType = "email-address"
                            placeholder = "Enter email address"
                            autoCorrect = {false}
                            autoCapitalize = "none"
                            onChangeText={(text) => {
                                store.dispatch({
                                    type: 'FORM_UPDATE',
                                    data: {
                                        key : 'email',
                                        value : text
                                    }
                                });
                            }}
                            style={{height: 70, fontSize : 30,  borderColor: 'black', color : 'black'}}
                        />
                        <Text style={[styles.fontAvenir, {color:'#2c3e50', fontSize:20}]}>
                            Enter your email address to also recieve notifications in your inbox
                        </Text>
                    </View>
                </Content>

                <Footer style={styles.footer}>
                    <TouchableHighlight
                        onPress={this.saveForm.bind(this)}
                    >
                        <Text style={{fontWeight : 'bold', fontSize:22}}>CONTINUE</Text>
                    </TouchableHighlight>
                </Footer>

            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container:{

    },
    colorWhite : {
        color: 'white',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    fontAvenir : {
        fontFamily: 'AvenirNext-Medium'
    },
    header : {
        backgroundColor : '#00638c'
    },
    footer : {
        backgroundColor:'#f39c12'
    },
    content : {
        backgroundColor:'#EBF4FA'
    },
    wrapper:{
        height:400
    }
});