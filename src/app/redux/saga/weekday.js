import { fork,call,put,takeEvery,all} from 'redux-saga/effects';

import weekdayActions, { GET_WEEKDAYS } from 'app/redux/actions/weekday';
import { getWeekdays } from 'app/services/api/weekdays';

function* GetWeekdays(action){
    try {
        const response = yield call(getWeekdays);
        yield put(weekdayActions.GetWeekdaysSuccess(response.data.data));
    }
    catch (err){
        yield put(weekdayActions.GetWeekdaysSuccess(err.response.data.error)); 
    }
}


function* watchGetWeekdays(){
    yield takeEvery(GET_WEEKDAYS,GetWeekdays);
}

export default function* weekdaysSaga(){
    yield all([
        yield fork(watchGetWeekdays)
    ]);
}