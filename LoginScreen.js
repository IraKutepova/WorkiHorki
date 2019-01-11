import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';
import {Constants, SecureStore} from 'expo';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {start: true}

    }

    onPress = () => {
        this.setState({
            isLogin: false,
            hasData: null
        })

    };
    setValueLocally = async (key, value) => {
        await SecureStore.setItemAsync(key, value);

    };

    getValueLocally_name = async (key) => {
        await SecureStore.getItemAsync(key).then(
                (value) => this.setState({getName: value}))

    };

    getValueLocally_password = async (key) => {
        await SecureStore.getItemAsync(key).then(
                (value) => this.setState({getPass: value}))

    };
    getValueLocally_has = async (key) => {

        await SecureStore.getItemAsync(key).then(
                (value) => this.setState({hasData: value}))

    };
    _navigate = (username, password) => {
        const {navigate} = this.props.navigation;
        {
            ((username === '') || (password==='')) ? alert('These fields are required!') :

                    navigate('TimeScreen', {
                        username: username,
                        password: password,
                        loginStatus: 'true'
                    });
        }
    };

    render() {

        const {navigate} = this.props.navigation;
        const {params} = this.props.navigation.state;
	   //if you navigate here from timescreen it will be yes
	    let toEditLoginForm= this.props.navigation.getParam('editLoginForm','No');
		    
	    
        if (this.state.start) {
            this.getValueLocally_name('name');
            this.getValueLocally_password('password');
            this.setState({start: false});
		this.getValueLocally_has('has');
	}
	    if(toEditLoginForm==='No')
	    {
	    if (this.state.hasData==='true')
	    {
		    
                           return     navigate('TimeScreen',{username:this.state.getName,
                                        password: this.state.getPass,
                        loginStatus: true
			   });

}
}
        return (
                <View style={styles.container}>
                    <Text style={styles.paragraph}>Please, login!</Text>
                   <Text style={styles.formText}>Name</Text>
                    <TextInput
                            style={styles.TextInputStyle}
                            onChangeText={(text) => this.setState({name: text})}
                            value={this.state.name}
                            defaultValue={this.state.getName}
                            underlineColorAndroid='transparent'
                            editable={true}
                            maxLength={40}
                    >
                    </TextInput>
                    <Text style={styles.formText}>
                        Password
                    </Text>

                    <TextInput
                            style={styles.TextInputStyle}
                            secureTextEntry={true}
                            onChangeText={(text1) => this.setState(
                              				    {pass: text1})}

                            underlineColorAndroid='transparent'
                            value={this.state.pass}
                            defaultValue={this.state.getPass}
                            editable={true}
                            password={true}
                            maxLength={40}
                    >
                    </TextInput>
                    <TouchableHighlight
                            style={styles.button}

                            onPress={() => {

                                this.setValueLocally('name', this.state.name);
                                this.setValueLocally('has', 'true');
                                this.setValueLocally('password',
                                        this.state.pass);
                                this.getValueLocally_name('name');
                                this.getValueLocally_password('password');
                                this._navigate(this.state.getName,
                                        this.state.getPass, true)

                            }
                            }
                    >

                        <Text style={styles.buttons}>
                            Login
                        </Text>
                    </TouchableHighlight>

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

    formText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#00FF00', margin: 5,
    },
    paragraph: {
        margin: 5,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
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

    TextInputStyle: {
        color: '#00FF00',

        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        margin: 5,
        height: 40,
        width: '95%',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 10
    },
});

