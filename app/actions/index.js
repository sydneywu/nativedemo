import {
	FETCHING_PEOPLE, FETCHING_PEOPLE_SUCCESS, FETCHING_PEOPLE_FAILURE,
	FETCH_USER, FETCH_PEOPLE_SHOP_SUCCESS, FETCH_PEOPLE_SHOP_FAILURE,
} from './constants'
import config from '../../config/config'

const shopEndPoint = '/shop/api/all/'
const peopleShopEndPoint = '/shop/api/usershop'

export function fetchPeopleFromAPI(){
	return (dispatch)=>{
		dispatch(getPeople())
		fetch(config.serverURL + shopEndPoint)
		.then(data =>{
			return data._bodyText
		})
		.then(body=>{
			var obj = JSON.parse(body)
			dispatch(getPeopleSuccess(obj))
		})
		.catch(err=> dispath(getPeopleFailure(err)))
	}
}

export function fetchPeopleAndShop(token){
	//console.log('xoxo token is ', token);

	return (dispatch)=>{
		dispatch(getPeople())
		fetch(config.serverURL + peopleShopEndPoint,{
			method: "GET",
			headers: {
        		'Authorization': token,			
			}
		})
		.then(data =>{
			return data._bodyText
		})
		.then(body=>{

			var obj = JSON.parse(body)

			console.log('kkkkkkkkkk user', obj.user)
			dispatch(getPeopleShopSuccess(obj))
		})
		.catch(err=>dispatch(getPeopleShopFailure(err)))
	}
}

export function getPeopleShopSuccess(data) {
  return {
    type: FETCH_PEOPLE_SHOP_SUCCESS,
    data: data,
  }
}

export function getPeopleShopFailure(err) {
  return {
    type: FETCH_PEOPLE_SHOP_FAILURE,
    error: err,
  }
}

export function getPeople() {
  return {
    type: FETCHING_PEOPLE
  }
}

export function getPeopleSuccess(data) {
  return {
    type: FETCHING_PEOPLE_SUCCESS,
    people: data,
  }
}

export function getPeopleFailure() {
  return {
    type: FETCHING_PEOPLE_FAILURE
  }
}

export function fetchUser(){
  return{
    type: 'FETCH_USER'
  }
}
