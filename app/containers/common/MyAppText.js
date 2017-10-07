import React, {Component} from 'react';
import {
  Text,
  View,
} from 'react-native';

export class MyAppText extends Component {
  render(){
    return (
      <Text style={{color: '#ffffff'}}>
        {this.props.children}
      </Text>
    )
  }
}

export class MyAppTitle extends Component {
  render(){
    return(
      <Text style={{color: '#ffffff', fontSize: 18}}>
        {this.props.children}
      </Text>
    )
  }
}
