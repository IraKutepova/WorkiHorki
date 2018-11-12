import {
    ActivityIndicator,
    Arrow,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Constants} from 'expo';
import React, {Component} from 'react';

import {Base64} from 'js-base64';

export default class Zapros extends Component {

    constructor(props) {

        super(props);

        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {
        this.getFetch();

        this.timer = setInterval(() => {
            return this.getFetch();
        }, 600000);

    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    getFetch() {
        return fetch(this.props.url1, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic' + ' ' + Base64.btoa(
                        this.props.username + ':' + this.props.password),
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.status !== 200) {
                return (Promise.reject(new Error(response.statusText)),
                                this.setState({
                                    isLoading2: true,

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
                dataSource: responseJson,
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {

        function isToday(element, index, array) {
            const today = new Date();
            let day = '';
            if (today.getDate() < 10) {
                day = '0' + today.getDate();
            }
            else {
                day = today.getDate();
            }
            const daytype = today.getFullYear() + '-' + (today.getMonth() + 1)
                    + '-' + day;
            return element.date.startsWith(daytype);
        }

        function timeToTime(time) {
            (time == 0) ?
                    time = '00:00'
                    : (time < 10) ?
                    time = '0' + Math.trunc(time) + ':' + Math.ceil(
                            Math.round((time - Math.trunc(time)) * 6)) + '0'
                    : time = Math.trunc(time) + ':' + Math.ceil(
                            Math.round((time - Math.trunc(time)) * 6)) + '0';

            return time
        }

        if (this.state.isLoading2) {
            return (
                    <View style={styles.container}>
                        <Text style={styles.paragraph}>
                            OH noooo... Error: {this.state.start1}
                        </Text>


                    </View>
            );
        }
        if (this.state.isLoading) {
            return (
                    <View style={{flex: 1, paddingTop: 20}}>
                        <ActivityIndicator/>
                    </View>
            );
        }
        const {dataSource} = this.state;

        return (
                <View style={styles.container}>

                    <Text style={styles.clocks}>
                        {timeToTime(dataSource[0].stats.find(
                                isToday).hours)} </Text>

                    {dataSource.map(
                            hit => <Text style={styles.clocks}>{timeToTime(
                                    hit.hourWorked)}</Text>)}

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
    clocks: {
        margin: 10,
        fontSize: 90,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#66FF00',
    }
});
 
