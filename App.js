import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';

import {Constants, SecureStore} from 'expo';
import {createStackNavigator} from 'react-navigation';
import LoginScreen from './LoginScreen.js';
import TimeScreen from './TimeScreen.js';


const TimeApp = createStackNavigator({
// at the home page you need to login to the app
    Home: {

        screen: LoginScreen,
        navigationOptions: {
            header: null,

        }
    },
// it shows you your spent working hours and earned moneys
    TimeScreen: {
        screen: TimeScreen,
        navigationOptions: {
            header: null,
        }
    },

});


// started from home page
export default class App extends React.Component {
    render() {
        return <TimeApp/>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#000080',
    },

    images1: {
        position: 'absolute',
        width: '100%', height: '100%'

    },
    images: {
        width: 200,
        height: 200,
        margin: 20,
    },

    clocks: {
        position: 'absolute',

        top: '40%',

        fontSize: 55,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#66FF00',
    }
});
