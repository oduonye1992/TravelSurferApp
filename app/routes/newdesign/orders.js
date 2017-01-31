import React, { Component } from 'react';
import { Text, StyleSheet,Dimensions, ListView, View, Image, ScrollView, TouchableHighlight } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import ListItemCard from '../../components/list_item_card';
import {Actions} from 'react-native-router-flux';
import QueryBuilder from '../../config/settings';
import { Pulse } from 'react-native-loader';
import store from '../../store/store';


export default class OrdersComponent extends Component {
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    constructor (props){
        super(props);
        this.state = {
            isLoading : true,
            dataState : 'empty',
            dataSource: this.ds.cloneWithRows(
                []
            )
        }
    }
    componentDidMount(){
        this.fetchOrders();
    }
    fetchOrders(){
        fetch(QueryBuilder.endpoint+'internet_price_order')
            .then((response) => response.json())
            .then((responseJson) => {
                //alert(JSON.stringify(responseJson));
                this.setState({
                    isLoading : false,
                    dataState : responseJson.length ? 'full' : 'empty',
                    dataSource: this.ds.cloneWithRows(responseJson)
                });
            })
    }
    onClick(item){
        Actions.internetorderdetail(item);
    }
    listView(){
        return         <ListView
            dataSource={this.state.dataSource}
            renderRow={
                (rowData) => {
                    return <ListItemCard
                        color = "#34495e"
                        text = {rowData}
                        onClick={this.onClick.bind(this)}
                    />
                }
            }
        />
    }
    renderEmpty(){
        let {height, width} =  Dimensions.get('window');
        return (
            <View style={{alignItems:'center', height:width*1,justifyContent:'flex-end', padding:30}}>
                <Text style={[styles.fontAvenir, {color:'#2c3e50', fontSize:30}]}>No Offers Yet</Text>
                <Text style={[styles.fontAvenir, {color:'#2c3e50', fontSize:20, marginTop:10}]}>
                    Wea re currently working hard to bring you the best offers worth your wait
                </Text>
            </View>
        );
    }
    renderMode (){
        if (this.state.isLoading){
            return (
                <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
                    <Pulse size={30} color="#3498db" />
                </View>
            );
        } else {
            if (this.state.dataState == 'empty'){
                return this.renderEmpty();
            }
            return this.listView();
        }
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
                        <Title style={[styles.colorWhite, styles.fontAvenir]}>INTERNET PRICE</Title>
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
                        {this.renderMode()}
                    </Content>
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
        padding : 20
    }
});