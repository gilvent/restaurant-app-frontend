export const GET_WEEKDAYS = "WEEKDAY/ Get Weekday Lookup Data";
export const GET_WEEKDAYS_SUCCESS = "WEEKDAY/ Get Weekdays Success";
export const GET_WEEKDAYS_FAIL = "WEEKDAY/ Get Weekdays Fail";

function GetWeekdays(){
    return {
        type: GET_WEEKDAYS
    }
}
function GetWeekdaysSuccess(data){
    return {
        type: GET_WEEKDAYS_SUCCESS,
        payload: data
    }
}
function GetWeekdaysFail(error){
    return {
        type: GET_WEEKDAYS_FAIL,
        payload: error
    }
}

const weekdayActions = {
    GetWeekdays, GetWeekdaysSuccess, GetWeekdaysFail
}

export default weekdayActions;