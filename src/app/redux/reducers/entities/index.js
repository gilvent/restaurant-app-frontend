import { combineReducers} from 'redux';

import usersReducer from './users';
import collectionsReducer from './collections';
import restaurantsReducer from './restaurants';
import weekdaysReducer from './weekdays';

export const entitiesReducers = combineReducers({
    users: usersReducer,
    collections: collectionsReducer,
    restaurants: restaurantsReducer,
    weekdays: weekdaysReducer
});