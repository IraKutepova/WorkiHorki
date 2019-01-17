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


export default class GetUserData extends Component {

    constructor(props) {
//common  value
        super(props);

        this.state = {
            	isLoading: true,
		isLoading2: false,
            	dollars: false,
		salary: this.props.salary,
		h: styles.clocksGreen,
		
        }

    }
// changed state of dollars value
    toggleDollars = () => {
        this.setState({
            dollars: !this.state.dollars
        });

    };
// getting data by interval period 10min
    componentDidMount() {
        this.getFetch();

        this.timer = setInterval(() => {
            return this.getFetch();
        }, 600000);
    }
// clear the timer
    componentWillUnmount() {
        clearInterval(this.timer);
    }
// get data: worked hours by user
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
					isLoading:false,
                                    start1: response.status,
                                })
                )
            }

            return Promise.resolve(response)
        })

        .then((response) => response && response.json() || {})
        .then((responseJson) => {

            this.setState({
                isLoading: false,
		    isLoading2:false,
                dollars: this.state.dollars,

                dataSource: responseJson,
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

 ColorOfHour (hours,hourWorked, weekDay){
	//if you work hard and have more hours 
		    let hoursAv=hourWorked/weekDay; 
		    hours+=hoursAv;
		    if (hours<2){ return styles.clocksRed;		    
		    }
		    else{ if(hours<4){return styles.clocksYellow;}
		    }
		    return styles.clocksGreen;
	    }
	    //find elements by date
         isToday(element, index, array) {
            const today = new Date();
            let day = today.getDate();
		let month = today.getMonth()+1;

            if ( day<10) {
                day ='0'+ today.getDate(); //for live add '0'+
            }
		  if (month < 10) {
                month ='0'+ month; //for live add '0'+
            }

            const daytype = today.getFullYear() + '-' + month
                    + '-' + day;
            return element.date.startsWith(daytype);
        }

	 getWeekDay() {
		//formula to get weekday number
	
		let now = new Date(); //today date
		let onejan = new Date(now.getFullYear(), 0, 1); // 01 January
		let day = Math.floor( (((now - onejan) / 86400000) + onejan.getDay()) );
		
		return day%7; 
	} 

//this function convert time to the right view or to dollars
         timeToTime(time, dollars,salary) {
		if (dollars) {
                return '$' + Math.round(time * salary * 100) / 100.0; //using user salary
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

    render() {
	
// if error occurs in the load data process
        if (this.state.isLoading2) {
            return (
                    <View style={styles.container}>
                        <Text style={styles.errorText}>
                            Sorry! Can not read data.
		    Error: {this.state.start1}
                        </Text>


                    </View>
            );
        }
	    //while data is loading it will be shown
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

	//finding worked hours per day by date

	    let hour= dataSource[0].stats.find(
                                    this.isToday).hours;
	   // worked hours per week
	  const hourWorked = dataSource.map(hit => hit.hourWorked);
	    // color style for viewing time by worked hours
	    const styleH = this.ColorOfHour(hour,hourWorked[0],this.getWeekDay());
        return (
                   //if you click on timescreen yoou will change it to the dollars   
		<TouchableOpacity
                                style={styles.button}
                                onPress={this.toggleDollars}>
		
                        <View style={styles.container}>
	                       <Text style={styleH}>
		
			
                            {this.timeToTime(dataSource[0].stats.find(
                                    this.isToday).hours, this.state.dollars,this.props.salary)}</Text>

                        {dataSource.map(
                                hit => <Text style={this.state.h}>
				{this.timeToTime(
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
	errorText:{
        margin: 10,
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FF0000',
		
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
 
