import {
    FETCH_RECIPES_REQUEST,
    FETCH_RECIPES_SUCCESS,
    FETCH_RECIPES_FAILURE
  } from './recipeTypes'
  
  const initialState = {
    loading: false,
    recipes: [],
    error: ''
  }
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_RECIPES_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_RECIPES_SUCCESS:
        return {
          loading: false,
          recipes: action.payload,
          error: ''
        }
      case FETCH_RECIPES_FAILURE:
        return {
          loading: false,
          recipes: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default reducer
  