'use strict'

import React, {Component} from 'react'
import ReactNative from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
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
} = ReactNative
import {StackNavigator, TabNavigator} from 'react-navigation'
import Shop from './Shop'
import TestComponent from './TestComponent'
import Profile from './Profile'
import Settings from './Settings'

const UserNavigator = TabNavigator({
  Profile: { screen: Profile },
  Shops: { screen: Shop },
  Settings: {screen: Settings},
});

UserNavigator.navigationOptions = {

  title: 'Booked',
  headerTintColor: 'black',
  headerLeft: null,
}

function mapStateToProps(state){
	return{
		searchedRecipes: state.searhedRecipes
	}
}


export default (UserNavigator);
