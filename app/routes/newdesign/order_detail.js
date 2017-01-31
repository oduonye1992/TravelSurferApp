import React, { Component } from 'react';
import { Text, StyleSheet,TouchableHighlight, ListView, View, Image, ScrollView } from 'react-native';
import { Container, Header, Title, Card, CardItem, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import ListItemCard from '../../components/list_item_card';
import {Actions} from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';
import Hr from '../../lib/hr';
import store from '../../store/store';

export default class OrderDetailComponent extends Component {
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    constructor (props){
        super(props);
        this.state = {
            dataSource: this.ds.cloneWithRows(
                []
            )
        }
    }
    detailView(){
        return <View>
            <View style = {{alignItems:'center', marginTop: -10}}>
                <Text style={{color:'grey', fontFamily: 'AvenirNext-Medium'}}>Internet Order 20-14-2017</Text>
            </View>
            <Card style={{ flex: 0 }}>
                <CardItem>
                    <View>
                        <View style={{flexDirection : 'row', justifyContent:'space-between'}}>
                            <View>
                                <Text style={{fontFamily: 'AvenirNext-Medium', fontWeight:'bold'}}>{this.props.hotel.name}</Text>
                                <Text style={{fontFamily: 'AvenirNext-Medium', color:'grey'}}>{this.props.hotel.country_id}</Text>
                                <Text style={{height:6}}>.</Text>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={4}
                                    selectedStar={(rating) => {}}
                                    starSize={10}
                                />
                            </View>
                            <View>
                                <Image source={{uri: 'https://exp.cdn-hotels.com/hotels/1000000/50000/45800/45775/45775_148_z.jpg'}}
                                       style={{width: 100, height: 80}} />
                            </View>
                        </View>
                        <Text style={{marginTop:10}}></Text>
                        <Hr lineColor='#ecf0f1' width="100"/>
                        <View style={{marginTop:10}}>
                            <View>
                                <Text style={{fontFamily: 'AvenirNext-Medium', color:'#00638c'}}>{this.props.hotel.name}</Text>
                                <Text style={{fontFamily: 'AvenirNext-Medium', color:'#00638c'}}>Internet Order</Text>
                                <Text style={{fontFamily: 'AvenirNext-Medium'}}>${this.props.price}</Text>
                            </View>
                        </View>
                        <Text style={{marginTop:10}}></Text>
                        <Hr lineColor='#ecf0f1' width="100"/>
                        <View style={{marginTop:10}}>
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <Icon name='md-plane' style={{color:'black'}}/>
                                <Icon name='md-checkmark' style={{color:'#16a085'}}/>
                            </View>
                        </View>
                        <Text style={{marginTop:3}}></Text>
                        <Hr lineColor='#ecf0f1' width="100"/>
                        <View style={{marginTop:10}}>
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <Icon name='ios-bus' style={{color:'black'}}/>
                                <Icon name='md-close' style={{color:'red'}}/>
                            </View>
                        </View>
                        <Text style={{marginTop:3}}></Text>
                        <Hr lineColor='#ecf0f1' width="100"/>
                        <View style={{marginTop:10}}>
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <Icon name='md-time' style={{color:'black'}}/>
                                <Text style={{fontFamily: 'AvenirNext-Medium', marginTop:14}}>{this.props.travel_start_date}</Text>
                            </View>
                        </View>
                        <Text style={{marginTop:3}}></Text>
                        <Hr lineColor='#ecf0f1' width="100"/>
                        <View style={{marginTop:10}}>
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <Icon name='md-plane' style={{color:'black'}}/>
                                <Text style={{fontFamily: 'AvenirNext-Medium', marginTop:14}}>{this.props.airport_id}</Text>
                            </View>
                        </View>
                        <Text style={{marginTop:3}}></Text>
                        <Hr lineColor='#ecf0f1' width="100"/>
                        <View style={{marginTop:10}}>
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <Icon name='md-beer' style={{color:'black'}}/>
                                <Text style={{fontFamily: 'AvenirNext-Medium', marginTop:14}}>All Inclusive</Text>
                            </View>
                        </View>
                        <Text style={{marginTop:3}}></Text>
                        <Hr lineColor='#ecf0f1' width="100"/>


                    </View>
                </CardItem>
            </Card>
        </View>
    }
    listView(){
        return         <ListView
            dataSource={this.state.dataSource}
            renderRow={
                (rowData) => {
                    return <ListItemCard
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
                    {this.detailView()}
                </Content>

                <Footer style={styles.footer}>
                    <TouchableHighlight
                        onPress={() => {
                            requestAnimationFrame(() => {
                                Actions.webview({url : this.props.booking_url})
                            });
                        }}
                    >
                        <Text style={{fontWeight : 'bold', fontSize:22}}>BOOK TICKET</Text>
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
        padding : 20,
        backgroundColor:'#EBF4FA'
    }
});