import React from 'react';
import { Image,StyleSheet,ActivityIndicator,AsyncStorage,TouchableOpacity, Text, View, Button } from 'react-native';
import { Constants,SecureStore } from 'expo';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen.js';
import FetchUserData from './Fet1.js';

 import TimerMixin from 'react-timer-mixin';


const SimpleApp = StackNavigator({
  
     Home: {
   
    screen: LoginScreen,
    navigationOptions: {header: null,
     
    }
   },
   WorkHours:{
    screen: FetchUserData,
    navigationOptions: {header: null,
    }
    },
  

});

export default class App extends React.Component {
       render() {
        return <SimpleApp />;
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