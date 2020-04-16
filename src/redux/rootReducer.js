import { combineReducers } from 'redux'
import recipeReducer from './recipe/recipeReducer'
// import iceCreamReducer from './iceCream/iceCreamReducer'
// import userReducer from './user/userReducer'

const rootReducer = combineReducers({
  recipe: recipeReducer
})

export default rootReducer
