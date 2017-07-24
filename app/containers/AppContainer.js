import React, {Component} from 'react';
import ReactNative from 'react-native';
import {connect} from 'react-redux';
import {ActionCreators} from '../actions';
import {bindActionCreators} from 'redux';
import Home from './Home';
var helper = require('../../config/helper.js');

console.log('oooooooooooooooooooo');

import {
  TouchableHighlight,
  AppRegistry,
  StyleSheet,
  AsyncStorage,
  Text,
  View
} from 'react-native';


class AppContainer extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<Home {...this.props} />

		)
	}
}

function mapDispatchToProps(dispatch){
	return {}
}

function mapStateToProps (state){
	return {}
}


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

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);