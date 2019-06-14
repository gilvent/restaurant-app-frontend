import { combineReducers} from 'redux';

import restaurantSearchReducer from './restaurant-search';

export const searchReducers = combineReducers({
    restaurants: restaurantSearchReducer
});