import {
    ActivityIndicator,
    Arrow,
    StyleSheet,
    Text,
	Image,
    TouchableOpacity,
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
            dollars: false,
            url1: 'https://banner2.kisspng.com/20180201/zxq/kisspng-dollar-sign-united-states-dollar-dollar-sign-5a737456028001.6807977015175158620103.jpg',
            url2: 'https://cdn4.iconfinder.com/data/icons/green-shopper/1049/settings.png',
	salary: this.props.salary	
		
        }

    }

    toggleDollars = () => {
        this.setState({
            dollars: !this.state.dollars
        });

    };

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
                'Authorization': 'Basic ' + Base64.btoa(
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

        .then((response) => response && response.json() || {})
        .then((responseJson) => {

            this.setState({
                isLoading: false,
                dollars: this.state.dollars,

                dataSource: responseJson,
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
function ColorOfHour (hours,hourWorked, weekDay){
	//if you work hard and have more hours 
		    let hoursAv=hourWorked/weekDay; 
		    hours+=hoursAv;
		    if (hours<2){ return styles.clocksRed;		    
		    }
		    else{ if(hours<4){return styles.clocksYellow;}
		    }
		    return styles.clocksGreen;
	    }
	    
        function isToday(element, index, array) {
            const today = new Date();
            let day = '';
            if (today.getDate() < 10) {
                day = '0'+ today.getDate(); //for live add '0'+
            }
            else {
                day = today.getDate();
            }
            const daytype = today.getFullYear() + '-' + (today.getMonth() + 1)
                    + '-' + day;
            return element.date.startsWith(daytype);
        }
	function getWeekDay() {
		//formula to get weekday number
	
		let now = new Date();
		let onejan = new Date(now.getFullYear(), 0, 1);
		let day = Math.floor( (((now - onejan) / 86400000) + onejan.getDay()) );
		
		return day%7; 
	} 


        function timeToTime(time, dollars,salary) {
		if (dollars) {
                return '$' + Math.round(time * salary * 100) / 100.0;
            }

            (time === 0) ?
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
                    <View style={styles.container}>
                        <ActivityIndicator/>
                        <Text style={styles.clocks}>
                        --:--
		    </Text>
                        <Text style={styles.clocks}>
                        --:--
		    </Text>
		    
                    </View>
            );
        }
        const {dataSource} = this.state;
            const today = new Date();

	const h=styles.clocksGreen;
	    const hour=dataSource[0].stats.find(
                                    isToday).hours;
	  const hourWorked = dataSource.map(hit => hit.hourWorked);
	    const styleH = ColorOfHour(hour,hourWorked[0],getWeekDay());
        return (
                      
		<TouchableOpacity
                                style={styles.button}
                                onPress={this.toggleDollars}>
		
                        <View style={styles.container}>
	                       <Text style={styleH}>
		
			
                            {timeToTime(dataSource[0].stats.find(
                                    isToday).hours, this.state.dollars,this.props.salary)}</Text>

                        {dataSource.map(
                                hit => <Text style={h}>
				{timeToTime(
                                        hit.hourWorked,
                                        this.state.dollars,this.props.salary)}</Text>)}


                    </View>
		</TouchableOpacity>
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
    clocksRed: {
        margin: 10,
        fontSize: 75,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FF0000',
    },
    clocksYellow: {
        margin: 10,
        fontSize: 75,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFF00',
    },
    clocksGreen: {
        margin: 10,
        fontSize: 75,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#66FF00',
    },
    
	images1: {
        width: 50,
        height: 50,
        //  margin: 20,
    },
	
});
 
