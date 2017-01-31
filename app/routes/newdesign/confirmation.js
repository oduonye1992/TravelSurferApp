import React, { Component } from 'react';
import { Text, StyleSheet, ListView, View, Image, ScrollView, TouchableHighlight } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import SearchBar from 'react-native-material-design-searchbar';
import ListItemPlain from '../../components/list_item_plain';
import {Actions} from 'react-native-router-flux';
import store from '../../store/store';

export default class ConfirmationComponent extends Component {
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    constructor (props){
        super(props);
        this.state = {}
    }
    doneBtnHandle(){
        Actions.addemail();
    }
    render(){
        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Button
                        onPress={() =>{
                            requestAnimationFrame(function(){
                                store.dispatch({
                                    type : 'OPEN_DRAWER'
                                })
                            })
                        }}
                        transparent>
                        <Icon name='md-menu' style={styles.colorWhite}/>
                    </Button>
                    <Title style={[styles.colorWhite, styles.fontAvenir]}>TRAVEL SURFER</Title>
                    <Button transparent
                            onPress = {
                                () => {
                                    requestAnimationFrame(() => {
                                        Actions.choosehotel({type:'reset'})
                                    });
                                }
                            }
                    ><Icon name='md-add' style={styles.colorWhite}/>
                    </Button>
                </Header>
                <Content style={styles.content}>
                    <View style={{alignItems:'center', justifyContent:'flex-end', marginTop:200, padding:30}}>
                        <Text style={[styles.fontAvenir, {color:'#2c3e50', fontSize:30}]}>Journey Created</Text>
                        <Text style={[styles.fontAvenir, {color:'#2c3e50', fontSize:20}]}>
                            Please activate push notification so that we can contact when we have a good offer for your journey
                        </Text>
                    </View>
                </Content>

                <Footer style={styles.footer}>
                    <TouchableHighlight
                        onPress={this.doneBtnHandle}
                    >
                        <Text style={{fontWeight : 'bold', fontSize:22}}>ACTIVATE PUSH NOTIFICATION</Text>
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