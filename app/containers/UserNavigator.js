'use strict'

import React, {Component} from 'react'
import ReactNative from 'react-native'
import {StackNavigator, TabNavigator} from 'react-navigation'
import Shop from './Shop'
import TestComponent from './TestComponent'
import Profile from './Profile'
import Settings from './Settings'

const UserNavigator = TabNavigator({
    Profile: {screen: Profile},
    Shops: {screen: Shop},
    Settings: {screen: Settings},
});

UserNavigator.navigationOptions = {
    title: 'Booked',
    headerTintColor: 'black',
    headerLeft: null,
}


export default (UserNavigator);
