import React, { Component } from 'react';
import { Text,Alert, StyleSheet, ListView, View, Image,Dimensions,
    ScrollView, TouchableHighlight,DatePickerIOS, TextInput, AsyncStorage
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import ListItemPlain from '../../components/list_item_plain';
import MapView from 'react-native-maps';
import Hr from '../../lib/hr';
import {Actions} from 'react-native-router-flux';
import store from "../../store/store";
import Picker from 'react-native-picker';
var moment = require('moment');


export default class FormsComponent extends Component {
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    constructor (props){
        super(props);
        this.state = {
            parent : store.getState().application,
            tempRoomType : {},
            isComplete : true
        };
        this.subscribe();
    }
    componentDidMount(){
        //moment(this.state.parent.start_date).format('YYYY-MM-DD')
    }
    subscribe(){
        let that = this;
        store.subscribe(function() {
            // Update your views here
            that.setState({
                parent : store.getState().application
            });
        })
    }
    openPicker(key){
        if (!this.state.parent.hotel.rooms.length){
            return
        }
        let data = [];
        let tempData = {};
        for(var i=0;i<this.state.parent.hotel.rooms.length;i++){
            data.push(this.state.parent.hotel.rooms[i].name);
            tempData[this.state.parent.hotel.rooms[i].name] = this.state.parent.hotel.rooms[i].id;
        }
        this.setState({
            tempRoomType : tempData
        });
        Picker.init({
            pickerData: data,
            pickerConfirmBtnText: 'Done',
            pickerCancelBtnText: 'Cancel',
            pickerTitleText: 'Room Type',
            onPickerConfirm: data => {
                console.log(data);
            },
            onPickerCancel: data => {
                console.log(data);
            },
            onPickerSelect: data => {
                console.log(data);
                var tmp = {};
                tmp[data] = this.state.tempRoomType[data];
                this.update(key, tmp);
            }
        });
        Picker.show();
    }
    openAirports(){
        Actions.chooseairports();
    }
    saveForm(){
        // Prepare the data
        let application = store.getState().application;
        let roomKey = Object.keys(application.room_type);
        let data = {
            hotel_id: application.hotel.id,
            airport_id: application.airport.id,
            start_date: moment(application.start_date).format('YYYY-MM-DD'),
            end_date: moment(application.end_date).format('YYYY-MM-DD'),
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
                this.saveEmail(application.email);
                Actions.confirmation();
            })
            .catch((err) => {
                alert(err.message);
            });
        // Send data
    }
    async sendForm(){
        /*
         Check if email exists
            If email exists
                CleanUp and send
            Else
                Open email page
                Open and exit
          */
        const email = await AsyncStorage.getItem('email');
        if (email){
            this.update('email', email);
            // Save
            this.saveForm();
        } else {
            Actions.addemail();
        }
    }
    openCalender(key){
        Actions.calender(key);
    }
    update (key, value){
        store.dispatch({
            type: 'FORM_UPDATE',
            data: {
                key : key,
                value : value
            }
        });
    }
    toggle(key){
        if (this.state.parent[key] == "Yes"){
            store.dispatch({
                type: 'FORM_UPDATE',
                data: {
                    key : key,
                    value : "No"
                }
            });
        } else {
            store.dispatch({
                type: 'FORM_UPDATE',
                data: {
                    key : key,
                    value : "Yes"
                }
            });
        }
    }
    detailView(){
        let {height, width} =  Dimensions.get('window');
        return <ScrollView style={{padding:6}}>
            <View>
                <Image source={{uri: this.state.parent.hotel.images.length ? this.state.parent.hotel.images[0].title : 'https://source.unsplash.com/random/400x800'}}
                       style={{width: width*0.9, height: height*0.25}}>
                    <TouchableHighlight
                        underlayColor="#2c3e50"
                        onPress = {() => {}}
                        style={{backgroundColor:'white', opacity:0.7, width: width*0.9, height: height*0.25, alignItems:'flex-start', justifyContent:'center'}}
                    >
                        <View style={{padding:10}}>
                            <Text style={{fontFamily: 'AvenirNext-Medium', color:'black', fontWeight:'bold', fontSize:20}}>{this.state.parent.hotel.name}</Text>
                            <Text style={{fontFamily: 'AvenirNext-Medium', color:'black'}}>{this.state.parent.hotel.country.title}</Text>
                        </View>
                    </TouchableHighlight>
                </Image>
            </View>
            <View style={{marginTop:20}}>
                <Text style={styles.question}>Airport</Text>
                <TouchableHighlight
                    underlayColor="#ecf0f1"
                    onPress={()=> {
                    requestAnimationFrame(() => {
                        this.openAirports();
                    });
                }}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='md-plane' style={{color:'black', fontSize:20}}/>
                        <Text style={{color:'grey', fontFamily: 'AvenirNext-Medium', marginLeft:10}}>{this.state.parent.airport.name}</Text>
                    </View>
                </TouchableHighlight>
                <Hr lineColor='grey' width="100"/>
            </View>
            <View style={{marginTop:20}}>
                <Text style={{color:'#00638c', fontFamily: 'AvenirNext-Medium', fontSize:15}}>When do you want to travel?</Text>
                <View style={{flexDirection:'row', marginTop:10, justifyContent :'space-between'}}>
                    <View style={{width:150}}>
                        <Text style={{color:'grey', fontFamily: 'AvenirNext-Medium', fontSize:15, marginBottom:5}}>Start Date</Text>
                            <View style={{flexDirection:'row'}}>
                                <TouchableHighlight
                                    underlayColor="#ecf0f1"
                                    onPress={() => {
                                        requestAnimationFrame(() => {
                                            this.openCalender('start_date');
                                        });
                                    }}
                                >
                                <Text style={{color:'grey', fontFamily: 'AvenirNext-Medium'}}>{this.state.parent.start_date}</Text>
                                </TouchableHighlight>
                            </View>
                            <Hr lineColor='grey' width="100"/>
                    </View>
                    <View style={{width:150}}>
                        <Text style={{color:'grey', fontFamily: 'AvenirNext-Medium', fontSize:15, marginBottom:5}}>End Date</Text>
                        <View style={{flexDirection:'row'}}>
                            <TouchableHighlight
                                underlayColor="#ecf0f1"
                                onPress={() => {
                                    requestAnimationFrame(() => {
                                        this.openCalender('end_date');
                                    });
                                }}
                            >
                                <Text style={{color:'grey', fontFamily: 'AvenirNext-Medium'}}>{this.state.parent.end_date}</Text>
                            </TouchableHighlight>
                        </View>
                        <Hr lineColor='grey' width="50"/>
                    </View>
                </View>
            </View>
            <View style={{marginTop:20}}>
                <Text style={styles.question}>How many Grown Ups?</Text>
                <View style={{flexDirection:'row', marginTop:10}}>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', width:500,  fontFamily: 'AvenirNext-Medium', marginLeft:10, color:'grey'}}
                        keyboardType = "numeric"
                        onChangeText={(text) => {
                            store.dispatch({
                                type: 'FORM_UPDATE',
                                data: {
                                    key : 'num_of_grown_up',
                                    value : text
                                }
                            });
                        }}
                        value={this.state.parent.num_of_grown_up}
                    />
                </View>
                <Hr lineColor='grey' width="100"/>
            </View>
            <View style={{marginTop:20}}>
                <Text style={styles.question}>How Many Children are coming</Text>
                <View style={{flexDirection:'row',marginTop:10}}>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', width:500,  fontFamily: 'AvenirNext-Medium', marginLeft:10, color:'grey'}}
                        onChangeText={(text) => {
                            store.dispatch({
                                type: 'FORM_UPDATE',
                                data: {
                                    key : 'num_of_children',
                                    value : text
                                }
                            });
                        }}
                        value={this.state.parent.num_of_children}
                    />
                </View>
                <Hr lineColor='grey' width="100"/>
            </View>
            <View style={{marginTop:20}}>
                <Text style={styles.question}>Transport from Airport to Hotel?</Text>
                <View style={{flexDirection:'row', marginTop:10}}>
                    <Icon name='md-bus' style={{color:'black', fontSize:20}}/>
                    <TouchableHighlight
                    onPress={this.toggle.bind(this, 'transport_from_airport_to_hotel')}>
                        <Text style={{color:'grey', fontFamily: 'AvenirNext-Medium', marginLeft:10}}>{this.state.parent.transport_from_airport_to_hotel}</Text>
                    </TouchableHighlight>
                </View>
                <Hr lineColor='grey' width="100"/>
            </View>
            <View style={{marginTop:20}}>
                <Text style={styles.question}>Boarding?</Text>
                <View style={{flexDirection:'row', marginTop:10}}>
                    <Icon name='md-beer' style={{color:'black', fontSize:20}}/>
                    <TouchableHighlight
                        onPress={this.toggle.bind(this, 'boarding')}
                    >
                        <Text style={{color:'grey', fontFamily: 'AvenirNext-Medium', marginLeft:10}}>{this.state.parent.boarding}</Text>
                    </TouchableHighlight>
                </View>
                <Hr lineColor='grey' width="100"/>
            </View>
            <View style={{marginTop:20}}>
                <Text style={styles.question}>Room Type</Text>
                <View style={{flexDirection:'row', marginTop:10}}>
                    <Icon name='md-glasses' style={{color:'black', fontSize:20}}/>
                    <TouchableHighlight
                        underlayColor="#ecf0f1"
                        onPress={() => {
                        requestAnimationFrame(() => {
                            this.openPicker('room_type');
                        });
                    }}>
                        <Text style={{color:'grey', fontFamily: 'AvenirNext-Medium', marginLeft:10}}>{Object.keys(this.state.parent.room_type)[0]}</Text>
                    </TouchableHighlight>
                </View>
                <Hr lineColor='grey' width="100"/>
            </View>
        </ScrollView>
    }
    listView(){
        return         <ListView
            dataSource={this.state.dataSource}
            renderRow={
                (rowData) => {
                    return <ListItemPlain
                        color = "#34495e"
                        text = {rowData}
                    />
                }
            }
        />
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
                    <Button transparent
                            onPress = {
                                () => {
                                    requestAnimationFrame(() => {
                                        Alert.alert(
                                            'New Search Order',
                                            'You are creating a new Search Order. Existing forms will be cleared',
                                            [
                                                {text: 'Continue', onPress: () => Actions.choosehotel()},
                                                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                            ]
                                        )
                                    });
                                }
                            }
                    >
                        <Icon name='md-add' style={styles.colorWhite}/>
                    </Button>
                </Header>
                <Content style={styles.content}>
                    {this.detailView()}
                </Content>
                <Footer style={styles.footer}>
                    <TouchableHighlight
                        underlayColor="#e67e22"
                        onPress={() => {
                        requestAnimationFrame(() => {
                            if (this.state.isComplete){
                                this.sendForm();
                            }
                        });
                    }}>
                        <Text style={{fontWeight : 'bold', fontSize:22, color: this.state.isComplete ? '#2c3e50' : '#7f8c8d'}}>CONTINUE</Text>
                    </TouchableHighlight>
                </Footer>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container:{},
    question : {
        color:'#00638c', fontFamily: 'AvenirNext-Medium', fontSize:15, marginBottom:5
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
        padding : 10
    }
});