import React, {Component, PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import {View, StyleSheet, Text, TouchableHighlight, ScrollView, ListView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


export default class HomeComponent extends Component{
    constructor (props){
        super(props);
    }
    openPrivateChannel(){
        Actions.privateMode();
    }
    componentDidMount(){
        // If it is the first time, go to the splash screen
        //Actions.walkthrough();
        // If last state was public, go to the public screen
        // If the last state was private, go to private screen
    }
    openPublicChannel(){
        Actions.publicMode();
    }
    render (){
        return(
            <LinearGradient colors={['#3498db', '#2980b9']} style={styles.container}>
                <Text style={styles.buttonText}>
                    Welcome to Formelo
                </Text>

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
        backgroundColor: 'transparent',
        borderColor: 'white',
        padding : 10,
        borderWidth : 1,
        borderRadius : 400,
        width : 330,
        marginTop : 15,
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