'use strict'

import React, {Component} from 'react'
import ReactNative from 'react-native'
import {connect} from 'react-redux'
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
import {StackNavigator} from 'react-navigation'
import {fetchUser, fetchPeopleFromAPI, fetchPeopleAndShop} from '../actions'
import config from '../../config/config'

let styles

class Profile extends Component {
 
  componentDidMount(){
    console.log('calling componentDidMount')
    //this.props.fetchUser()
    this.attachAsyncStorageAndFetch()
  }

  async _getStorageValue(){
    var value = await AsyncStorage.getItem('id_token')
    return value
  }

  attachAsyncStorageAndFetch(){
    //console.log('ojafpojsdpfojsapfoj')
    var token = this._getStorageValue();
    token.then((data)=>{
      //console.log("======== token", data);
      this.props.fetchPeopleAndShop(data);
    })

    
  }
  
  render(){
    const { navigate } = this.props.navigation;
    //console.log('================ start render', this.props)
    const {dispatch, people, shop, isFetching, initialMessage} = this.props.people;
    const onUserClick = ()=>{

      console.log("xoxoxoxoxo people is ", people);
      //this.props.fetchPeopleAndShop()
      this.attachAsyncStorageAndFetch()
    }

    return (
      <ScrollView>
        <Text style={styles.title}> Current Points </Text>
        {/*<TouchableHighlight onPress={onUserClick} style={styles.button}>
          <Text style={styles.buttonText}>Get Profile!</Text>
        </TouchableHighlight>*/}
        {
          isFetching && <Text>Loading</Text>
        }
        {
          shop.length ? (
            <View style={{    
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}>
              
                <Text style={styles.smallTitle}> {shop[0].name} </Text>
                <Image 
                  source={{uri: config.serverURL+'/images/' + shop[0].featured_image}} 
                  style={{width: 300, height: 300}}
                />
                <Button 
                  onPress={() => navigate('Chat')}
                  title="More"
                />
                <Text style={styles.normalFont}> Value: ${people[0].coupon[0].value}  </Text>
                <Text> Address: {shop[0].address} </Text>
              <TouchableHighlight 
                style={styles.touchableShops} 
                onPress={() => navigate('ShopInfo', {shop: shop[0].slug})}
              >
                <View style={styles.highlightView}>
                  <Text> Press me </Text>
                  <Text> Press me </Text>
                  <Image 
                    source={{uri: config.serverURL+'/images/' + shop[0].featured_image}} 
                    style={{width: 300, height: 300}}
                  />
                </View>
              </TouchableHighlight>

            </View>
          ) : null
        }

        <View
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
          }}
        />

        {
          shop.length ? (
            <View style={{    
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={styles.smallTitle}> {shop[0].name} </Text>
              <Image 
                            source={{uri: config.serverURL+'/images/' + shop[0].featured_image}} 
                style={{width: 300, height: 300}}
              />
              <Text style={styles.normalFont}> Value: ${people[0].coupon[0].value}  </Text>
              <Text> Addrses: {shop[0].address} </Text>
            </View>
          ) : null
        }

      </ScrollView>   
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
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },  
  smallTitle: {
    fontSize: 22,
    alignSelf: 'center',
    marginBottom: 5
  },
  normalFont: {
    fontSize: 14,
    alignSelf: 'center',
    marginBottom: 5
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
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
  button: {
    height: 300,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

function mapDispatchToProps(dispatch){
  return {
    fetchUser: ()=> dispatch(fetchUser()),
    getPeople: ()=> dispatch(fetchPeopleFromAPI()),
    fetchPeopleAndShop: (token) => dispatch(fetchPeopleAndShop(token)),
  }
}

function mapStateToProps (state){
  console.log('mapStateToProps', state)
  
  const {people, shop} = state
  return {
    people,
    shop
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);