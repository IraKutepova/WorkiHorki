import React from 'react';
import {StyleSheet} from 'react-native';
import {Constants} from 'expo';
import {createStackNavigator} from 'react-navigation';
import LoginScreen from './LoginScreen.js';
import FetchUserData from './Fet1.js';

const SimpleApp = createStackNavigator({

    Home: {

        screen: LoginScreen,
        navigationOptions: {
            header: null,

        }
    },
    WorkHours: {
        screen: FetchUserData,
        navigationOptions: {
            header: null,
        }
    },

});

// noinspection JSUnusedGlobalSymbols
export default class App extends React.Component {
    render() {
        return <SimpleApp/>;
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