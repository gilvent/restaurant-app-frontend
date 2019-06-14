import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer  from './auth';
import {entitiesReducers} from './entities';
import {searchReducers} from './search';

export const getRootReducer = () => {
    return combineReducers({
        auth: authReducer,
        entities: entitiesReducers,
        search: searchReducers, 
        form: formReducer
    });
}