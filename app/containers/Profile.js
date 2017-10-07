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
    FlatList,
    ImageBackground,
} = ReactNative
import {StackNavigator} from 'react-navigation'
import {fetchUser, fetchPeopleFromAPI, fetchPeopleAndShop} from '../actions'
import config from '../../config/config'
import {MyAppText, MyAppTitle} from './common/MyAppText'


let styles

class MyFeaturedItem extends Component {
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    }

    render() {
        console.log('the props of this is ', this.props)
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
                <TouchableHighlight
                    style={styles.touchableShops}
                    onPress={this._onPress}
                >
                    <View style={styles.highlightView}>
                        <ImageBackground
                            source={{uri: config.serverURL + '/images/' + this.props.item.featured_image}}
                            style={styles.featuredCardImage}
                        >
                            <View style={{backgroundColor: 'rgba(52, 52, 52, 0.5)', justifyContent: "space-between"}}>
                                <MyAppText> {this.props.item.name} </MyAppText>
                            </View>
                        </ImageBackground>
                    </View>
                </TouchableHighlight>

            </View>
        )
    }
}

class MyListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    }

    render() {
        return (

            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
                <TouchableHighlight
                    style={styles.touchableShops}
                    onPress={this._onPress}
                >
                    <View style={styles.highlightView}>
                        <ImageBackground
                            source={{uri: config.serverURL + '/images/' + this.props.item.featured_image}}
                            style={styles.cardImage}
                        >
                            <View style={{backgroundColor: 'rgba(52, 52, 52, 0.5)', justifyContent: "space-between"}}>
                                <MyAppText> {this.props.item.name} </MyAppText>
                            </View>
                        </ImageBackground>
                    </View>
                </TouchableHighlight>

            </View>
        )
    }
}

class Profile extends Component {

    componentDidMount() {
        console.log('calling componentDidMount')
        console.log('+++calling componentDidMount+++' + JSON.stringify(this.props.navigation))
        //this.props.fetchUser()
        this.attachAsyncStorageAndFetch()
    }

    async _getStorageValue() {
        var value = await AsyncStorage.getItem('id_token')
        return value
    }

    async attachAsyncStorageAndFetch() {
        /*
        var token = await this._getStorageValue();
        console.log("======== token", token);
        var shops = await this.props.fetchPeopleAndShop(token);
        console.log("shops now become ", shops);
        */
    }

    _navigate = (item) => {
        this.props.navigation.navigate('ShopInfo', {shop: item.slug})
    }

    _renderItem = ({item, index}) => (
        <MyListItem
            item={item}
            onPressItem={this._navigate}
        />
    )

    render() {
        const {navigate} = this.props.navigation;
        const {dispatch, people, shop, isFetching, initialMessage} = this.props.people;
        const onUserClick = () => {

            console.log("xoxoxoxoxo people is ", shop);
            //this.props.fetchPeopleAndShop()
            this.attachAsyncStorageAndFetch()
        }


        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.containerChildren}>
                {this.props.people.shop.length > 0 ? (
                    <MyFeaturedItem
                        item={this.props.people.shop[0]}
                        onPressItem={this._navigate}
                    />
                ) : null
                }
                <View style={styles.listRoot}>
                    <FlatList
                        data={this.props.people.shop}
                        numColumns={2}
                        renderItem={this._renderItem}
                        keyExtractor={item => item._id}
                        contentContainerStyle={styles.listRoot}
                    />
                </View>
                <Text style={styles.title}> Favourite Shop </Text>


            </ScrollView>
        )
    }
}

styles = StyleSheet.create({
    container: {
        marginTop: 0,
        backgroundColor: '#000000',
        flex: 1,
    },
    containerChildren:{
        alignItems: 'center',
    },
    cardImage: {
        width: 200,
        height: 200,
        alignItems: 'stretch',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    featuredCardImage: {
        width: 400,
        height: 200,
        alignItems: 'stretch',
        flexDirection: 'column',
        justifyContent: 'flex-end'
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
        backgroundColor: '#000000',
        //borderColor: '#e9e900',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',

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
    listRoot: {
        flex: 1,
        justifyContent: 'center',
    }
});

Profile.navigationOptions = ({navigation}) => ({
    //title: `Shopping ${navigation.state.params.shop}`,
    headerTintColor: 'green',
    //headerLeft: null,
});

function mapDispatchToProps(dispatch) {
    return {
        fetchUser: () => dispatch(fetchUser()),
        getPeople: () => dispatch(fetchPeopleFromAPI()),
        fetchPeopleAndShop: (token) => dispatch(fetchPeopleAndShop(token)),
    }
}

function mapStateToProps(state) {
    const {people, shop} = state
    return {
        people,
        shop
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
