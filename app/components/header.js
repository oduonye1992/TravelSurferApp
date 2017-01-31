import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableHighlight , ListView} from 'react-native'
import {Actions} from 'react-native-router-flux';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import ListWithIconComponent from './list_with_icon';
import store from '../store/store';
export default class HeaderComponent extends Component{
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    constructor (props) {
        super(props);
        this.state = {
            dataSource: this.ds.cloneWithRows(
                [
                    {
                        title: 'My Offers',
                        icon: 'ios-people-outline'
                    }
                ]
            )
        };
    }
    renderSidebar(){
        return (
            <View>

                <View style={{padding:10}}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={
                                (rowData) => {
                                    return <ListWithIconComponent
                                        onClick = {this.onClick.bind(this)}
                                        title = {rowData.title}
                                        icon = {rowData.icon}
                                        data = {rowData}
                                    />
                                }
                            }
                    />
                </View>
            </View>
        );
    }
    renderUglySidebar(){
        return (
            <View>
                <View style={{height:200, backgroundColor : '#8584d8', alignItems:'center', justifyContent:'center'}}>
                    <Image style={styles.image} source={{uri: 'https://source.unsplash.com/random/100x100'}}/>
                    <Text style={{fontFamily: 'Avenir Next', color:'white', fontSize:30, padding:10}}>Namarata</Text>
                    <Text style={{fontFamily: 'AvenirNext-Medium', color:'white'}}>Student</Text>
                </View>
                <View style={{paddingTop:10}}>
                    <View style={{alignItems:'center', padding:16}}>
                        <Text style={{fontFamily: 'Avenir Next', color:'#2c3e50', fontSize:30}}>Home</Text>
                    </View>
                    <View style={{alignItems:'center', padding:16}}>
                        <Text style={{fontFamily: 'Avenir Next', color:'#2c3e50', fontSize:30}}>Profile</Text>
                    </View>
                    <View style={{alignItems:'center', padding:16}}>
                        <Text style={{fontFamily: 'Avenir Next', color:'#2c3e50', fontSize:30}}>Feed</Text>
                    </View>
                    <View style={{alignItems:'center', padding:16, flexDirection:'row', width:350}}>
                        <Text style={{marginLeft:60, fontFamily: 'Avenir Next', color:'#2c3e50', fontSize:30}}>Messages </Text>
                        <TouchableHighlight
                            style={{backgroundColor:'#e7645a', padding:7,paddingLeft:9,paddingRight:9, borderRadius:50}}
                        >
                            <Text style={{fontFamily: 'Avenir Next', color:'white', fontSize:10}}>1</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{alignItems:'center', padding:16}}>
                        <Text style={{fontFamily: 'Avenir Next', color:'#2c3e50', fontSize:30}}>Settings</Text>
                    </View>
                </View>
            </View>
        );
    }
    onClick(data){
        if (data.title == 'My Offers'){
            Actions.internetorderlist();
        } else if (data.title == 'Internet Order'){
            Actions.parents();
        }
        store.dispatch({
            type : 'CLOSE_DRAWER'
        })
    }
    render(){
        return (
            <Container style={styles.container}>
                <Header style={{backgroundColor:'white'}}>
                    <Title style={[styles.headerButton, styles.fontAvenir]}></Title>
                </Header>
                <Content style={styles.content}>
                    {this.renderSidebar()}
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    footer : {
        backgroundColor : '#2c3e50'
    },
    footerText : {
        fontWeight : 'bold',
        fontSize : 15,
        color:'#bdc3c7',
        fontFamily: 'Avenir Next'
    },
    image: {
        height: 100,
        borderRadius: 50,
        width: 100,
        borderWidth:2,
        borderColor:'white'
    },
    headerButton : {

    }
});