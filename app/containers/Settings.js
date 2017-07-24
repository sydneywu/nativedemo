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
  Switch,
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

   state = {
      switchValue: false
   }

   toggleSwitch = (value) => this.setState({ switchValue: value })

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
      this.attachAsyncStorageAndFetch()
    }

    //console.log("this.props.navigation.state.params", this.props.navigation.state.params)
    //console.log("++++++", thisCoupon)
    //console.log("===========", thisShop)
    //console.log("thisShop.promotions", thisShop.promotions)

    return (
      <ScrollView>
      { people.length ? (
          <View>
           
            <View style={styles.textContainer}>
              <Text style={styles.normalFont}>Name</Text>
              <Text style={styles.normalFont}>{people[0].email} </Text>
            </View>
            <View style={styles.greyLine}/>   

            <View style={styles.textContainer}>
              <Text style={styles.normalFont}>Email</Text>
              <Text style={styles.normalFont}>{people[0].email} </Text>
            </View>
            <View style={styles.greyLine}/>           

            <View style={styles.textContainer}>
              <Text style={styles.normalFont}>Role</Text>
              <Text style={styles.normalFont}>{people[0].role} </Text>
            </View>
            <View style={styles.greyLine}/>

            <View style={styles.textContainer}>
              <Text style={styles.normalFont}>Notification</Text>
               <Switch style={styles.normalSwitch} onValueChange = {this.toggleSwitch} value = {this.state.switchValue}/>
            </View>
            <View style={styles.greyLine}/>

            <View style={{marginTop: 50}} />
           
            <Button
              style={{marginTop: 30}}
              onPress={() => navigate('Home')}
              title="Log Out"
            />

  

          </View> 
        ): null
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
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  buttonTouch: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  normalButton: {
    height: 300,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

  normalSwitch: {
    marginLeft: 50,
  },

  textContainer: {
    flexDirection:'row', 
    flexWrap:'wrap'
  },
  greyLine: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
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
    fontSize: 18,
    alignSelf: 'baseline',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 50
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
  console.log('mapStateToProps', state)
  
  const {people, shop} = state
  return {
    people,
    shop
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShopInfo);