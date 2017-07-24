'use strict'

var React = require('react');
var ReactNative = require('react-native');
import {connect} from 'react-redux'
import {StackNavigator, TabNavigator} from 'react-navigation'
import config from '../../config/config'
var t = require('tcomb-form-native');
var {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
} = ReactNative;
import UserNavigator from './UserNavigator';


////////// Login Screen //////////////
var STORAGE_KEY = 'id_token';

var Form = t.form.Form;

var Person = t.struct({
  email: t.String,
  password: t.String
})
var serverUrl = config.serverURL

const options = {};

var Login = React.createClass({

 
  async _onValueChange(item, selectedValue){
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error){
      console.log('AsyncStorage error: ' + error.message);
    }
  },

  async _getProtectedQuote() {
    console.log('calling protected quote')

    var DEMO_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
    console.log(DEMO_TOKEN);
   
    fetch(serverUrl + "/dashboard", {
      method: "GET",
      headers: {
        'Authorization': DEMO_TOKEN
      }
    })
    .then((response)=> response.text())
    .then((quote)=>{
      console.log(quote);
    })
    .done();
  },

  _userSignup() {
    var value = this.refs.form.getValue();
    if (value) { //if validation fails, value will be null
      
      fetch(serverUrl + "/register", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: value.email,
          password: value.password,
        })
      })
      .then((response)=> response.json())
      .then((responseData)=>{
        this._onValueChange(STORAGE_KEY, responseData.id_token),
        console.log("storage key is ", STORAGE_KEY);
        console.log("storage key is ", responseData.id_token);
        console.log('Signup Success!')
      })
      .done();
    }
  },

  _test(){
    console.log('calling test');
    fetch(
      //"http://www.google.com",
      "http://192.168.1.11:3000",
      {
      method:"GET",
    })
    .then((response)=>{
      console.log(response)
    })
    .done()
    
  },

  _userLogin(){
  	
    var value = this.refs.form.getValue();
    if (value){ // if validation fails, value will be null
  		console.log('there is value')

      fetch(serverUrl + "/authenticate", {
        method: "POST",
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: value.email,
          password: value.password,
        })
      })
      .then((response)=>{
      	console.log('there is a response')
      	return response.json()
      })
      .then((responseData) => {
        if (responseData.success==false){
          return
        } else if (responseData.success==true){
          console.log(responseData)
          this._onValueChange(STORAGE_KEY, responseData.token)
          console.log(responseData.token)
          this.props.navigation.navigate('UserNavigator');
        }

      })
      .done();
    }
  },


  async _userLogout(){
    try{
      await AsyncStorage.removeItem(STORAGE_KEY);
      console.log("logout success!")
    } catch (error){
      console.log('AsyncStorage error: ' + error.message);
    }
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Sign up or Login to start using</Text>
        </View>
        <View style={styles.row}>
          <Form
            ref="form"
            type={Person}
            options={options}
          />
        </View>  
        <View style={styles.row}>
          {/*<TouchableHighlight style={styles.button} onPress={this._userSignup} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableHighlight>*/}
          <TouchableHighlight style={styles.button} onPress={this._userLogin} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
          {/*<TouchableHighlight style={styles.button} onPress={this._userLogout} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableHighlight>*/}
        </View>
        {/*<View style={styles.row}>    
          <TouchableHighlight onPress={this._getProtectedQuote} style={styles.button}>
            <Text style={styles.buttonText}>Get a Chuck Norris Quote!</Text>
          </TouchableHighlight>
        </View>*/}
      </View>
    );
  }  
})

function mapStateToProps(state){
  return{

  }
}


var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    //marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});


//export default connect(mapStateToProps)(SimpleApp);
export default connect(mapStateToProps)(Login);