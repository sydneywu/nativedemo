'use strict'

import React, {Component} from 'react'
import ReactNative from 'react-native'
import {connect} from 'react-redux'
var t = require('tcomb-form-native');
const {
  ScrollView,
  View,
  TextInput,
  Text,
  Image,
  AsyncStorage,
  TouchableHighlight,
  StyleSheet,
  Button,
  Switch,
} = ReactNative
import {StackNavigator} from 'react-navigation'
import {
  fetchUser, fetchPeopleFromAPI, fetchPeopleAndShop, registerUser
} from '../actions'
import config from '../../config/config'

let styles
var Form = t.form.Form;
let redirected = false;

var Person = t.struct({
  name: t.String,
  email: t.String,
  password: t.String,
})

var options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    }
  }
}

class ShopInfo extends Component {

  componentDidMount(){
    console.log('calling componentDidMount from register')
    redirected=false;
    //this.props.fetchUser()
    //this.attachAsyncStorageAndFetch()
  }

  componentDidUpdate(){
    console.log('============', 'componentDidUpdate from register')
    if (this.props.people.userLoggedIn==true && redirected==false){
      redirected=true;
      this.props.navigation.navigate('UserNavigator');
    }
  }

  async _getStorageValue(){
    var value = await AsyncStorage.getItem('id_token')
    console.log('===================value is ')
    return value
  }

   state = {
      switchValue: false
   }

   toggleSwitch = (value) => this.setState({ switchValue: value })

  attachAsyncStorageAndFetch(){
    //console.log('ojafpojsdpfojsapfoj')
    var token = this._getStorageValue();
    token.then((data)=>{
      //console.log("======== token", data);
      this.props.fetchPeopleAndShop(data);
    })
  }

  async _registerUser(){
    var value = this.refs.form.getValue();
    console.log('register value is', value);
    await this.props.registerUser(value);
  }

  render(){
    const { navigate } = this.props.navigation;
    //console.log('================ start render', this.props)
    const {dispatch, people, shop, isFetching, initialMessage} = this.props.people;
    const onUserClick = ()=>{
      this.attachAsyncStorageAndFetch()
    }

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Form
            ref="form"
            type={Person}
            options={options}
          />
        </View>

        <View style={styles.row}>
          <TouchableHighlight style={styles.button} onPress={this._registerUser.bind(this)} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

styles = StyleSheet.create({

  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  buttonTouch: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  normalButton: {
    height: 300,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

  normalSwitch: {
    marginLeft: 50,
  },

  textContainer: {
    flexDirection:'row',
    flexWrap:'wrap'
  },
  greyLine: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },

  title: {
    fontSize: 30,
    alignSelf: 'center',
  },

  smallTitle: {
    fontSize: 22,
    alignSelf: 'center',
    marginBottom: 5
  },

  normalFont: {
    fontSize: 18,
    alignSelf: 'baseline',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 50
  },

  normalBoldFont: {
    fontSize: 14,
    alignSelf: 'center',
    marginBottom: 5,
    fontWeight: 'bold',
  },

  normalFontLeft: {
    fontSize: 14,
    justifyContent: 'flex-start',
    marginBottom: 5
  },

  highlightView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableShops: {
    height: 300,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  shopContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  shopFeaturedImage:{
    width: 300,
    height: 300,
    marginTop: 10,
    marginBottom: 10
  },
  promoImage:{
    //flex: 1,
    //resizeMode: 'cover',
    width: 300,
    height: 150
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

ShopInfo.navigationOptions = ({navigation})=>({
  title: 'Sign Up',
  headerTintColor: 'green',
  //headerLeft: null,
});

function mapDispatchToProps(dispatch){
  return {
    fetchUser: ()=> dispatch(fetchUser()),
    getPeople: ()=> dispatch(fetchPeopleFromAPI()),
    fetchPeopleAndShop: (token) => dispatch(fetchPeopleAndShop(token)),
    registerUser: (data)=>dispatch(registerUser(data)),
  }
}

function mapStateToProps (state){
  const {people, shop} = state
  return {
    people,
    shop
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShopInfo);
