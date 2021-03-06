import React from 'react'
import { TouchableHighlight, View, Text, StyleSheet, Button } from 'react-native'

import { connect } from 'react-redux'
import {fetchPeopleFromAPI} from '../actions'

let styles

const App = (props) => {
  const {
    container,
    text,
    button,
    buttonText
  } = styles
  const { people, isFetching } = props.people;
  return (
    <View style={container}>
      <Text style={text}>Redux Example</Text>
      <TouchableHighlight style={button} onPress={() => props.getPeople()}>
        <Text style={buttonText}>Load People</Text>
      </TouchableHighlight>
      {
        isFetching && <Text>Loading</Text>
      }
      {
        people.length ? (
          people.map((person, index) => {
            return <View key={index} >
              <Text>Name: {person.name}</Text>
              <Text>Birth Year: {person.slug}</Text>
            </View>
          })
          /*
          <View>
          	<Text> There is a shop name {people} </Text>
          </View>
          */
        ) : null
      }
    </View>
  )
}

App.navigationOptions = ({navigation})=> {
  return{
    title: 'Settings',
    headerLeft: null
  }
};

styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingLeft: 20,
    paddingRight: 20
  },
  text: {
    textAlign: 'center'
  },
  button: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b7eff'
  },
  buttonText: {
    color: 'white'
  }
})

function mapStateToProps (state) {
  return {
    people: state.people
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPeople: () => dispatch(fetchPeopleFromAPI())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)