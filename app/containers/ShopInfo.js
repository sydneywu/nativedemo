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

class ShopInfo extends Component {
 
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

    let thisShop = shop.find(x=> {
      console.log(x.slug);
      return x.slug == this.props.navigation.state.params.shop
    })

    console.log("this.props.navigation.state.params", this.props.navigation.state.params)
    console.log("++++++", shop)
    console.log("===========", thisShop)

    return (
      <ScrollView>
        <Text style={styles.title}> {thisShop.name} </Text>
        {/*<TouchableHighlight onPress={onUserClick} style={styles.button}>
          <Text style={styles.buttonText}>Get Profile!</Text>
        </TouchableHighlight>*/}
        {
          isFetching && <Text>Loading</Text>
        }
        {
          <View style={styles.shopContainer}>

            <Text>{JSON.stringify(shop)}</Text>
            <Image 
              source={{uri: config.serverURL+'/images/' + shop[0].featured_image}} 
              style={styles.shopFeaturedImage}
            />
            <Text> Address: </Text>            
            <Text> {thisShop.address} </Text>    
            <Image 
              source={{uri: config.serverURL+'/images/' + thisShop.featured_image}} 
          
            />        
          </View>
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
                <Text style={styles.normalFont}> Value: ${people[0].coupon[0].value}  </Text>
                <Text> Address: {shop[0].address} </Text>

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
  shopContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  shopFeaturedImage:{
    width: 300, 
    height: 300
  }
});

ShopInfo.navigationOptions = ({navigation})=>({
  title: `Shopping ${navigation.state.params.shop}`,
  headerTintColor: 'green',
  headerLeft: null,
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


export default connect(mapStateToProps, mapDispatchToProps)(ShopInfo);