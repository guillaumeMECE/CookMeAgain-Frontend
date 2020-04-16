import axios from 'axios'
import {
    FETCH_RECIPES_REQUEST,
    FETCH_RECIPES_SUCCESS,
    FETCH_RECIPES_FAILURE
} from './recipeTypes'

// const { data } = await axios.post("http://192.168.0.22:3030/api/recipe/read", {
//                 userUID: Cookies.get('umid')
//             });

export const fetchRecipes = (umid) => {
    return (dispatch) => {
        dispatch(fetchRecipesRequest())
        console.log("IT WORK FETCH RECIPES");
        
        axios
            .post("http://192.168.0.22:3030/api/recipe/read", {
                userUID: umid
            })
            .then(response => {
                // response.data is the users
                const recipes = response.data
                dispatch(fetchRecipesSuccess(recipes))
            })
            .catch(error => {
                // error.message is the error message
                dispatch(fetchRecipesFailure(error.message))
            })
    }
}

export const fetchRecipesRequest = () => {
    return {
        type: FETCH_RECIPES_REQUEST
    }
}

export const fetchRecipesSuccess = recipes => {
    return {
        type: FETCH_RECIPES_SUCCESS,
        payload: recipes
    }
}

export const fetchRecipesFailure = error => {
    return {
        type: FETCH_RECIPES_FAILURE,
        payload: error
    }
}
