'use strict'

var React = require('react');
var ReactNative = require('react-native');
import {connect} from 'react-redux'
import {StackNavigator, TabNavigator} from 'react-navigation'
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
import Login from './Login';
import Test from './Test';
import TestComponent from './TestComponent';
import ShopInfo from './ShopInfo';


//////////// Main Navigator /////////////
const Home = StackNavigator({
  //Home: {screen: Login},
  Home: {screen: UserNavigator},
  UserNavigator: {screen: UserNavigator},
  Chat: {screen: Test},
  ShopInfo: {screen: ShopInfo}
})

/*
Home.navigationOptions = {
  title: 'MyScreen',
  left: null,
}
*/

export default Home;