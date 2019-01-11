import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    Timers,
    TouchableOpacity,
    View
} from 'react-native';
import {Constants, SecureStore} from 'expo';
import React, {Component} from 'react';
import {Base64} from 'js-base64';
import GetUserData from './GetUserData';


export default class TimeScreen extends Component {

    constructor(props) {

        super(props);

        this.state = {
            isLoading: true,
            errorLoading: false,
            start: true,

        }
    }
	//get user name from secure store
    getValueLocally_name = async (key) => {
        await SecureStore.getItemAsync(key).then(
                (value) => this.setState({getName1: value}))

    };
	//get user password from secure store

    getValueLocally_password = async (key) => {
        await SecureStore.getItemAsync(key).then(
                (value) => this.setState({getPass1: value}))

    };

    componentDidMount() {
	  return  this.getFetch();
    }
	//get user data
	getFetch(){
		//this values was send to this class from LoginScreen
const user=this.props.navigation.state.params.username;
	    const pass=this.props.navigation.state.params.password;
      
	    
        return fetch('http://185.185.70.210:8081/api/detail', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + Base64.btoa(user+ ':' + pass),
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            if (response.status !== 200) {
                return (Promise.reject(new Error(response.statusText)),
                                this.setState({
                                    errorLoading: true,
                                    isLoading: false,

                                    errorNumber: response.status
                                })
                )
            }

            return Promise.resolve(response)
        })
        .then((response) => response && response.json() || {})
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                errorLoading: false,
                dataSource: responseJson,
                errorNumber: false,
            }, function () {

            });
        })
        .catch((error) => {
            this.setState({
                error: error
            });
        });

    }
	  //set url to the user time data
	_setUrl(userId, teamId, managerId) {
            return 'http://185.185.70.210:8081/api/timetracking/timesheets?managerId='+managerId+'&period=WEEK&teamId='+teamId+'&userId='+userId;
        }

    render() {
	//this values was send to this class from LoginScreen
        const {navigate} = this.props.navigation;
        const {params} = this.props.navigation.state;
//icon for back button to loginscreen
	    let pic1 = {
            uri: 'https://cdn4.iconfinder.com/data/icons/green-shopper/1049/settings.png'
        };

        const {dataSource} = this.state;
	    
        if (this.state.errorLoading) {
           return (
                    <View style={styles.container}>
                        <Text style={styles.paragraph}>
                            Upss... Error: {this.state.errorNumber}
                        </Text>
                        <Text style={styles.paragraph}>
                            {params.username}
                        </Text>
                        <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    navigate('Home',{editLoginForm:'yes'})
                                }}>
                            <Text style={styles.buttons}>
                                Go to Login
                            </Text>

                        </TouchableOpacity>
                    </View>
            );
        }

        if (this.state.isLoading) {
            return (
                    <View style={styles.container}>
                        <ActivityIndicator/>
                    </View>
            );
        }
   
     return (
                <View style={styles.container}>
                    <View style={styles.row1}>
                        <Text style={styles.paragraph}>
                           {dataSource.fullName}
                        </Text>
                        <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    navigate('Home',{editLoginForm: 'yes'});
				
                                }}>

                            <Image source={pic1} style={styles.images1}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textRegister}> ___________________ </Text>
		
                    {dataSource &&
                    <GetUserData url1={this._setUrl(dataSource.id,
                            dataSource["assignment"].team.id,
                            dataSource["assignment"].manager.id)}
                            username={this.props.navigation.state.params.username}
                            password={this.props.navigation.state.params.password}
                            salary={dataSource["assignment"].salary}/>
                    || this.state.error && <Text> {JSON.stringify(
                            this.state.error)} </Text>
                    }


                </View>

        );
     
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#000080',
    },
    row1: {
        flexDirection: 'row', height: 50, paddingTop: 10,

    },
    paragraph: {
        margin: 5,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#00FF00',
    },
    images1: {
        width: 50,
        height: 50,
        //  margin: 20,
    },
    textRegister: {

        fontSize: 25,
        fontWeight: 'bold',
        color: '#00FF00',
    },
    buttons: {
        textAlign: 'center',
        fontSize: 30,
        color: '#000080',
        height: 40,
        width: 200,
        backgroundColor: '#00FF00',
        borderRadius: 7,
        margin: 15,
    },
});
 
