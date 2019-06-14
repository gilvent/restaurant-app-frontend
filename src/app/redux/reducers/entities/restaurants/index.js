import { GET_RESTAURANTS_SUCCESS, SEARCH_RESTAURANTS_SUCCESS } from "app/redux/actions/restaurant";
import { GET_COLLECTION_DETAILS_SUCCESS } from "app/redux/actions/collection";

/**
 * Add restaurant to the state
 * @param {*} state Previous state
 * @param {Object} payload An object containing restaurant data
 */
const addRestaurantEntry = (state, payload) => {
    let { byId, allIds } = state;
    let { id, name, scheduleInfo } = payload;
    if(allIds.indexOf(id) === -1){
        allIds = allIds.concat(id);
    }
    
    byId = {
        ...byId,
        [id]: { id, name, scheduleInfo }
    }
    
    return {
        ...state,
        allIds,
        byId
    };
}


let initialState = {
    allIds: [],
    byId: {}
}


const restaurantsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_COLLECTION_DETAILS_SUCCESS:
            const { restaurants } = action.payload;
            return restaurants.reduce((state,restaurant) => addRestaurantEntry(state,restaurant),state);

        case GET_RESTAURANTS_SUCCESS:
        case SEARCH_RESTAURANTS_SUCCESS:
            return action.payload.reduce((state,restaurant) => addRestaurantEntry(state,restaurant),state);
        default: return state;

    }
}


export default restaurantsReducer;