'use strict'

import React, {Component} from 'react'
import ReactNative from 'react-native';
import {connect} from 'react-redux'
import {StackNavigator, TabNavigator} from 'react-navigation'
import config from '../../config/config'
import t from 'tcomb-form-native'
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
import {loginUser} from '../actions'

let styles;
let redirected = false;
var Form = t.form.Form;

var Person = t.struct({
  email: t.String,
  password: t.String
})

var options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    }
  }
}

class Login extends Component {

  componentDidMount(){
    //console.log('calling componentDidMount from login')
    console.log("===========this.props is ", this.props)
    redirected = false;
  }

  componentDidUpdate(){
    if (this.props.people.userLoggedIn==true && redirected==false){
      redirected=true;
      this.props.navigation.navigate('UserNavigator');
    }
  }

  _userLogin(){
    var value = this.refs.form.getValue();
    this.props.loginUser(value);
  }

  _userSignUp(){
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Booked</Text>
        </View>
        <View style={styles.row}>
          <Form
            ref="form"
            type={Person}
            options={options}
          />
        </View>
        <View style={styles.row}>
          <TouchableHighlight style={styles.button} onPress={this._userLogin.bind(this)} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.button} onPress={this._userSignUp.bind(this)} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableHighlight>
        </View>

      </View>
    );
  }
}

styles = StyleSheet.create({
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

function mapStateToProps(state){
  const {people, shop} = state
  return{
    people,
    shop
  }
}

function mapDispatchToProps(dispatch){
  return{
    loginUser: (data)=>dispatch(loginUser(data))
  }
}


//export default connect(mapStateToProps)(SimpleApp);
export default connect(mapStateToProps, mapDispatchToProps)(Login);
