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
import Register from './Register';


//////////// Main Navigator /////////////
const routeConfiguration = {
  Home: {screen: Login},
  Login: {screen: Login},
  UserNavigator: {screen: UserNavigator},
  Chat: {screen: Test},
  ShopInfo: {screen: ShopInfo},
  Register: {screen: Register}
}

const stackNavigatorConfiguration = {
    initialRouteName: 'Home'
    //initialRouteName: 'UserNavigator'
};


const StackNavigatorWrapper = StackNavigator(routeConfiguration, stackNavigatorConfiguration);

export default StackNavigatorWrapper;
