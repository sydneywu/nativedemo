import {combineReducers} from 'redux'
import {
	FETCHING_PEOPLE, FETCHING_PEOPLE_SUCCESS, FETCHING_PEOPLE_FAILURE,
	FETCH_USER, FETCH_PEOPLE_SHOP_SUCCESS, FETCH_PEOPLE_SHOP_FAILURE,
} from '../actions/constants'

const initialState = {
	people: [],
	shop: [],
	isFetching: false,
	initialMessage: 'hello initialMessage',
	error: false,
}

export default function peopleReducer(state=initialState, action){
	switch(action.type){
		case FETCHING_PEOPLE:
			return{
				...state,
				isFetching: true,
			}

		case FETCHING_PEOPLE_SUCCESS:
			return {
				...state,
				isFetching: false,
				people: action.people,
			}

		case FETCHING_PEOPLE_FAILURE:
			return {
				...state,
				isFetching: false,
				error: true,
			}	

		case FETCH_USER:
			return{
				...state,
				isFetching: true,
				initialMessage: 'loaded differently',
				error: false,
				people: ['mona'],
			}
		
		case FETCH_PEOPLE_SHOP_SUCCESS:
			
			return{
				...state,
				isFetching: false,
				initialMessage: 'loaded differently',
				error: false,
				people: action.data.user,
				shop: action.data.shop
			}
		
		case FETCH_PEOPLE_SHOP_FAILURE:
			return{
				...state,
				isFetching: false,
				error: true,
			}


		default: 
			return state
	}
}