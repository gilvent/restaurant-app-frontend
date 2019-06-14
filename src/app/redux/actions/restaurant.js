export const GET_RESTAURANTS = "RESTAURANT/ Get Restaurants";
export const GET_RESTAURANTS_SUCCESS = "RESTAURANT/ Get Restaurants Success";
export const GET_RESTAURANTS_FAIL = "RESTAURANT/ Get Restaurants Fail";

export const SEARCH_RESTAURANTS = "RESTAURANT/ Search Restaurants";
export const SEARCH_RESTAURANTS_SUCCESS = "RESTAURANT/ Search Restaurants Success";
export const SEARCH_RESTAURANTS_FAIL = "RESTAURANT/ Search Restaurants Fail";

function GetRestaurants(weekdayIds = null, time = null, name = null){
    let filter = Object.assign({},
            weekdayIds ? {weekdayIds} : null, 
            time ? {time} : null,
            name ? {name} : null
        );
    return { 
        type: GET_RESTAURANTS, 
        payload: filter
    }
}
function GetRestaurantsSuccess(data){
    return {
        type: GET_RESTAURANTS_SUCCESS,
        payload: data
    }
}
function GetRestaurantsFail(payload){
    return {
        type: GET_RESTAURANTS_FAIL,
        payload
    }
}

function SearchRestaurants(filter){
    return { type: SEARCH_RESTAURANTS,payload:filter }
}

function SearchRestaurantsSuccess(data){
    return { type: SEARCH_RESTAURANTS_SUCCESS, payload: data }
}

function SearchRestaurantsFail(error){
    return { type: SEARCH_RESTAURANTS_FAIL, payload: error }
}

const restaurantActions = {
    GetRestaurants,
    GetRestaurantsSuccess,
    GetRestaurantsFail,

    SearchRestaurants,
    SearchRestaurantsSuccess,
    SearchRestaurantsFail
}

export default restaurantActions;