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

/*
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render(){
    const { navigate } = this.props.navigation;
    return (
      <View> 
        <Text> Hello, Navigation</Text>
        <Button
          onPress = {()=> navigate('Chat', {user: 'Peter'})}
          title = "Chat"
        />
        <Button
          onPress = {()=> navigate('Shop')}
          title = "Shop"
        />
        <Button
          onPress = {()=> navigate('TestComponent')}
          title = "TestComponent"
        />
      </View>
    )
  }
}

class RecentChatsScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return( 
      <View> 
      <Text>List of recent chats</Text>
      <Button
        onPress={
          () => {
            //console.log('this is the props', this.props.navigation)
            this.props.navigation.navigate('Chat', { user: 'Peter' })
          }
        }
        title="Chat with Peter"
      />
      </View>
    )
  }
}

class AllContactsScreen extends React.Component {

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View> 
      <Text>List of all contacts</Text>
      <Button
      onPress={() => navigate('Chat', { user: 'Bob' })}
      title="Chat with Bob"
      />
      </View>
    )
  }
}
*/
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