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
  Alert,
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

  showAlert(){
      Alert.alert(
         'The Vendor has not enabled this feature yet'
      )
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

    let thisCoupon = people[0].coupon.find(x=>{
      return x.shop == this.props.navigation.state.params.shop
    })

    //console.log("this.props.navigation.state.params", this.props.navigation.state.params)
    //console.log("++++++", thisCoupon)
    //console.log("===========", thisShop)
    //console.log("thisShop.promotions", thisShop.promotions)

    return (
      <ScrollView>
        <Text style={styles.title}> {thisShop.name} </Text>
        <Text style={styles.normalFont}> Credit: {thisCoupon.value.formatMoney(2)}</Text>
        {/*<TouchableHighlight onPress={onUserClick} style={styles.button}>
          <Text style={styles.buttonText}>Get Profile!</Text>
        </TouchableHighlight>*/}
        {
          isFetching && <Text>Loading</Text>
        }
        {
          <View style={styles.shopContainer}>
            <Image
              source={{uri: config.serverURL+'/images/' + thisShop.featured_image}}
              style={styles.shopFeaturedImage}
            />
           <Text style={styles.normalFontLeft}> {thisShop.description} </Text>
           <Text style={styles.normalBoldFont}> Address: </Text>
           <Text style={styles.normalFont}> {thisShop.address} </Text>
           <Text style={styles.normalBoldFont}> Phone No: </Text>
           <Text style={styles.normalFont}> {thisShop.phone} </Text>

          </View>

        }

        <View style={{marginTop: 5}} />
        <Button
          onPress={this.showAlert}
          title="Make Appointment"
        />

        <View style={{marginTop: 5}} />
        <Button
          onPress={this.showAlert}
          title="Chat"
        />

        <View style={{marginTop: 5}} />
        <View
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
            marginBottom: 10,
          }}
        />

        {
          <View style={styles.shopContainer}>
            <Text style={styles.title}> Promotions </Text>
          </View>
        }

        {
            thisShop.promotions.map((promotion, index)=>(

              <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
                key={promotion.name}
              >

                  <Text style={styles.smallTitle}> {promotion.name} </Text>
                  <Image
                    source={{uri: config.serverURL+'/images/' + promotion.featured_image}}
                    style={styles.promoImage}
                  />
                  <Text style={styles.normalFont}> {promotion.description} </Text>


              </View>
              )

            )

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
  normalBoldFont: {
    fontSize: 14,
    alignSelf: 'center',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  normalFontLeft: {
    fontSize: 14,
    justifyContent: 'flex-start',
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
    height: 300,
    marginTop: 10,
    marginBottom: 10
  },
  promoImage:{
    //flex: 1,
    //resizeMode: 'cover',
    width: 300,
    height: 150
  }
});

ShopInfo.navigationOptions = ({navigation})=>({
  //title: `Shopping ${navigation.state.params.shop}`,
  headerTintColor: 'green',
  //headerLeft: null,
});

function mapDispatchToProps(dispatch){
  return {
    fetchUser: ()=> dispatch(fetchUser()),
    getPeople: ()=> dispatch(fetchPeopleFromAPI()),
    fetchPeopleAndShop: (token) => dispatch(fetchPeopleAndShop(token)),
  }
}

function mapStateToProps (state){
  //console.log('mapStateToProps', state)

  const {people, shop} = state
  return {
    people,
    shop
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShopInfo);
