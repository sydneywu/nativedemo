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



var Test = React.createClass({

  render() {
    return (
      <View style={styles.container}>
        
        <View style={styles.row}>
          <Text style={styles.title}>Testing</Text>
          <Text style={styles.title}>Testing</Text>
          <Text style={styles.title}>Testing</Text>
          <Text style={styles.title}>Testing</Text>
        </View>
        
      </View>
    );
  }  

})

Test.navigationOptions = ({navigation})=> {
  return{
    title: `Test`,
  }
};



var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    //marginTop: 50,
    padding: 20,
    marginTop: 20,
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

export default Test;