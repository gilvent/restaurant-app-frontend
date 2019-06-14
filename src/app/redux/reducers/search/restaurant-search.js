import { SEARCH_RESTAURANTS_SUCCESS, SEARCH_RESTAURANTS } from "app/redux/actions/restaurant";

let initialState = {
    resultIds: [],
    // query strings for api request
    filters: {
        name: "",
        time: "",
        weekdays: "", // array of weekdays number in string, example : 1,2,3
    }
}

const restaurantSearchReducer = (state = initialState, action) => {
    switch(action.type){
        case SEARCH_RESTAURANTS:
            let filters = action.payload
            return {...state, filters: filters }
        case SEARCH_RESTAURANTS_SUCCESS:
            return {...state,resultIds : action.payload.map(data => data.id)};   
        default: return state
    }
}

export default restaurantSearchReducer;