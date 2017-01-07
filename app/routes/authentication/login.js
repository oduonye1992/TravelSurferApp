import React, {Component, PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableHighlight, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
export default class LoginComponent extends Component{
    constructor (props){
        super(props);
    }
    openPinPage(){
        Actions.private_pin();
    }
    render (){
        return(
            <LinearGradient colors={['#f1c40f', '#f39c12']} style={styles.container}>
                <Text style={styles.buttonText}>
                    Login To TravelSurfer
                </Text>
                <TextInput
                    autoFocus = {true}
                    placeholder = "Team ID"
                    style={{height: 70, fontSize : 30,  borderColor: 'white', color : 'white'}}
                />
                <TextInput
                    autoFocus = {true}
                    placeholder = "Password"
                    style={{height: 70, fontSize : 30,  borderColor: 'white', color : 'white'}}
                />

                <TouchableHighlight
                    style={styles.btnPrivate}
                    onPress={this.openPinPage}>
                    <Text  style={{
                        fontFamily: 'AvenirNext-Medium',
                        textAlign : 'center',
                        fontSize : 20,
                        color : '#f39c12'
                    }}>
                        Login
                    </Text>
                </TouchableHighlight>
                <View style={{width : 350,  marginTop : 180,  flexDirection : 'row', justifyContent : 'space-between', height : 60, alignItems : 'center', padding : 15}}>
                    <Text  style={{
                        fontFamily: 'AvenirNext-Regular',
                        textAlign : 'center',
                        fontSize : 15,
                        backgroundColor : 'transparent',
                        color : 'white'
                    }}>
                        Forgot Password?
                    </Text>
                    <TouchableHighlight
                        style={styles.btnFooter}
                        underlayColor = "#ecf0f1"
                        onPress={Actions.forgot}
                    >
                        <Text  style={{
                            fontFamily: 'AvenirNext-Medium',
                            textAlign : 'center',
                            fontSize : 20,
                            color : 'white',
                            marginTop : -14
                        }}>
                            Recover
                        </Text>
                    </TouchableHighlight>
                </View>
            </LinearGradient>
        );
    }
}
const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'flex-start',
        padding: 20
    },
    btnPublic : {
        backgroundColor: 'white',
        padding : 10,
        borderRadius : 400,
        width : 330,
        marginTop : 35,
    },
    btnPrivate : {
        backgroundColor: 'white',
        padding : 10,
        borderRadius : 5,
        width : 150,
        marginTop : 15,
    },
    btnFooter : {
        backgroundColor: 'transparent',
        width : 180,
        padding : 20,
        borderColor: 'white',
        borderWidth: 1
    },
    buttonText: {
        fontSize: 33,
        color: 'white',
        marginTop : 120,
        fontFamily: 'AvenirNext-Medium',
        backgroundColor: 'transparent',
    },
    infoTitle : {
        fontFamily: 'AvenirNext-Medium',
        color : 'white',
        backgroundColor: 'transparent',
        fontSize : 15,
        marginTop : 80
    },
    infoDescription: {
        fontFamily: 'AvenirNext-Medium',
        color : 'white',
        backgroundColor: 'transparent',
        fontSize : 12,
        marginTop : 14
    }
});