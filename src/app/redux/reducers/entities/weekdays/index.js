import { GET_WEEKDAYS_SUCCESS } from "app/redux/actions/weekday";

let initialState = {
    byId: {},
    allIds: []
}

/**
 * Add weekday to the state
 * @param {*} state Previous state
 * @param {Object} payload An object containing weekday data
 */
const addWeekdayEntry = (state, payload) => {
    let { byId, allIds } = state;
    let { id, name } = payload; 

    if(allIds.indexOf(id) === -1){
        allIds = allIds.concat(id);
    }
    
    byId = {
        ...byId,
        [id]: { id, name }
    }
    
    return {
        ...state,
        allIds,
        byId
    };
}

const weekdaysReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_WEEKDAYS_SUCCESS:
            const weekdays = action.payload;
            return weekdays.reduce((state,weekday) => addWeekdayEntry(state,weekday),state)
        default: return state;

    }
}


export default weekdaysReducer;