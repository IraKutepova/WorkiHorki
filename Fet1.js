import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    Timers,
    TouchableOpacity,
    View
} from 'react-native';
import {Constants} from 'expo';
import React, {Component} from 'react';
import {Base64} from 'js-base64';
import Zapros from './Zapros';

export default class FetchUserData extends Component {

    constructor(props) {

        super(props);

        this.state = {
            isLoading: true,
            isLoading2: false,

            dataArray: [],
            start1: true,
            start: true,

        }
    }

    componentDidMount() {
        const {params} = this.props.navigation.state;

        return fetch('http://185.185.70.210:8081/api/detail', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic' + ' ' + Base64.btoa(
                        params.username + ':' + params.password),
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            if (response.status !== 200) {
                return (Promise.reject(new Error(response.statusText)),
                                this.setState({
                                    isLoading2: true,
                                    isLoading: false,

                                    start1: response.status
                                })
                )
            }

            return Promise.resolve(response)
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                isLoading2: false,

                dataSource: responseJson,

                start1: false,
            }, function () {

            });
        })
        .catch((error) => {
            console.error(error);
        });

    }

    render() {
        const {navigate} = this.props.navigation;

        const {params} = this.props.navigation.state;
        let pic1 = {
            uri: 'https://cdn4.iconfinder.com/data/icons/green-shopper/1049/settings.png'
        };

        const {dataSource} = this.state;

        function _setUrl(userId, teamId, managerId) {
            return 'http://185.185.70.210:8081/api/timetracking/timesheets?managerId=1441355&period=WEEK&teamId=857&userId=8019';
        }

        if (this.state.isLoading2) {
            return (
                    <View style={styles.container}>
                        <Text style={styles.paragraph}>
                            Upss... Error: {this.state.start1}
                        </Text>
                        <Text style={styles.paragraph}>
                            {params.username}
                        </Text>
                        <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    navigate('Home')
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
                                    navigate('Home')
                                }}>

                            <Image source={pic1} style={styles.images1}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textRegister}> ___________________ </Text>

                    <Zapros url1={_setUrl(dataSource.id,
                            dataSource["assignment"].team.id,
                            dataSource["assignment"].manager.id)}
                            username={params.username}
                            password={params.password}/>

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
 
