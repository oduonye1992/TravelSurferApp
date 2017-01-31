import React, { Component } from 'react';
import { Text, StyleSheet,Dimensions, ListView, View, Image, ScrollView, TouchableHighlight, Alert } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import SearchBar from 'react-native-material-design-searchbar';
import ListItemPlain from '../../components/list_item_plain';
import {Actions} from 'react-native-router-flux';
import MapView from 'react-native-maps';
import QueryBuilder from '../../config/settings';
import { Pulse } from 'react-native-loader';
import store from '../../store/store';

export default class HomeComponent extends Component {
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    constructor (props){
        super(props);
        this.state = {
            dataSource: this.ds.cloneWithRows(
                []
            ),
            isSearching : true,
            isFetching : false,
            selectedHotel : null
        }
    }
    componentDidMount(){

    }
    itemClicked(data) {
        this.setState({
            isSearching : false,
            selectedHotel : data
        });
    }
    detailView(){
        let {height, width} =  Dimensions.get('window');
        return <ScrollView style={{padding:6}}>
            <View>
                <Image source={{uri: this.state.selectedHotel.images.length ? this.state.selectedHotel.images[0].title : 'https://source.unsplash.com/random/400x800'}}
                       style={{width: width*0.85, height: height*0.3}} />
                <View style={{marginTop:10}}>
                    <Text style={{color:'#2c3e50', fontFamily: 'AvenirNext-Medium', fontSize:20}}>{this.state.selectedHotel.name}</Text>
                    <Text style={{color:'grey', fontFamily: 'AvenirNext-Medium'}}>{this.state.selectedHotel.location}</Text>
                    <Text style={{color:'grey', fontFamily: 'AvenirNext-Medium'}}>Tel:{this.state.selectedHotel.phone}</Text>
                    <Text style={{color:'grey', fontFamily: 'AvenirNext-Medium'}}>{this.state.selectedHotel.email}</Text>
                </View>
            </View>
            {this.renderMap()}
        </ScrollView>
    }
    renderMap(){
        let {height, width} =  Dimensions.get('window');
        return (
            <View style={{flex:1, marginTop:10, height:height*0.3}}>
                <MapView
                    style={ styles.map }
                    initialRegion={{
                        latitude: this.state.selectedHotel.latitude,
                        longitude: this.state.selectedHotel.longitude
                    }}
                />
            </View>

        );
    }
    listView(){
        return         <ListView
            dataSource={this.state.dataSource}
            renderRow={
                (rowData) => {
                    return <ListItemPlain
                        onClicked = {this.itemClicked.bind(this)}
                        color = "#34495e"
                        text = {rowData}
                    />
                }
            }
        />
    }
    openOrderPage(){
        if (this.state.selectedHotel){
            store.dispatch({
                type: 'HOTEL_SELECTED',
                data: {
                    value : this.state.selectedHotel
                }
            });
            Actions.openform();
        }
    }
    renderMode(){
        return this.state.isSearching ? this.listView() : this.detailView();
    }
    setSearching(){
        this.setState({
            isSearching : true
        });
    }
    renderSpinner(){
        return (
            <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
                <Pulse size={30} color="#3498db" />
            </View>
        );
    }
    searchHotels(text){
        //alert(JSON.stringify(text));
        if(text.length < 3){
            return;
        }
        this.setState({
            isSearching : true,
            isFetching : true
        });
        var endpoint = QueryBuilder.endpoint+'hotels/suggest?q='+text;
        fetch(endpoint)
            .then((response) => response.json())
            .then((responseJson) => {
                //alert(JSON.stringify(responseJson));
                this.setState({
                    pageArray: responseJson,
                    isFetching : false,
                    isisSearching : false,
                    dataSource: this.ds.cloneWithRows(responseJson)
                });
            })
            .catch((error) => {
                alert(error);
            });
    }
    renderView(){
        if (this.state.isFetching){
            return this.renderSpinner();
        } else {
            return (
                <View style={{backgroundColor:'white'}}>
                    {this.renderMode()}
                </View>
            );
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
                    <SearchBar
                        onSearchChange={this.searchHotels.bind(this)}
                        height={40}
                        onFocus={this.setSearching.bind(this)}
                        onBlur={() => console.log('On Blur')}
                        inputStyle = {{color:'#2c3e50', backgroundColor:'white', borderColor:'white'}}
                        placeholder={'Search Hotels'}
                        iconColor = "#2c3e50"
                        placeholderColor = "#2c3e50"
                        padding={5}
                        returnKeyType={'search'}
                    />
                    {this.renderView()}

                </Content>

                <Footer style={styles.footer}>
                    <TouchableHighlight
                        underlayColor="#e67e22"
                        onPress={() => {
                        requestAnimationFrame(() => {
                            if (!this.state.isSearching){
                                this.openOrderPage();
                            }
                        });
                    }}>
                        <Text style={{fontWeight : 'bold',color: this.state.isSearching ? '#7f8c8d' : '#2c3e50', fontSize:22}}>CONTINUE</Text>
                    </TouchableHighlight>
                </Footer>
            </Container>
        );
    }
}
let {height, width} =  Dimensions.get('window');
const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    container:{

    },
    colorWhite : {
      color: 'white',
    },
    fontAvenir : {
        fontFamily: 'AvenirNext-Medium'
    },
    header : {
        backgroundColor : '#00638c'
    },
    footer : {
        backgroundColor: '#f39c12'
    },
    content : {
        padding : 20,
        backgroundColor:'#EBF4FA'
    }
});