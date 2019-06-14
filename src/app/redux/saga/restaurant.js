import { fork,call,put,takeEvery,all} from 'redux-saga/effects';

import restaurantActions, { GET_RESTAURANTS, SEARCH_RESTAURANTS } from 'app/redux/actions/restaurant';
import { getRestaurants } from 'app/services/api/restaurants';

function* GetRestaurants(action){
    try {
        const response = yield call(getRestaurants);
        yield put(restaurantActions.GetRestaurantsSuccess(response.data.data));
    }
    catch (err){
        yield put(restaurantActions.GetRestaurantsFail(err.response.data.error)); 
    }
}

function* SearchRestaurants(action){
    const filters = action.payload;

    try {
        const response = yield call(getRestaurants,filters);
        yield put(restaurantActions.SearchRestaurantsSuccess(response.data.data));
    }
    catch(err){
        yield put(restaurantActions.SearchRestaurantsFail(err.response.data.error));
    }
}

// Redux Saga Watchers
function* watchGetRestaurants(){
    yield takeEvery(GET_RESTAURANTS,GetRestaurants);
}

function* watchSearchRestaurants(){
    yield takeEvery(SEARCH_RESTAURANTS,SearchRestaurants);
}

export default function* restaurantSaga(){
    yield all([
        yield fork(watchGetRestaurants),
        yield fork(watchSearchRestaurants)
    ]);
}