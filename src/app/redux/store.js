import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {removeToken} from 'app/services/local-storage/token'

import { getRootReducer } from './reducers';
import authSaga from './saga/auth';
import userSaga from './saga/user';
import restaurantSaga from './saga/restaurant';
import weekdaysSaga from './saga/weekday';
import collectionSaga from './saga/collection';

// Initialize Redux Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Redux Persist Configuration
const persistConfig = {
    key: 'root',
    storage,
  }
const persistedReducer = persistReducer(persistConfig,getRootReducer());

const getStore = () => {
    
    const store = createStore(
        persistedReducer,
        {},
        applyMiddleware(sagaMiddleware,logger)
    );
    let persistor = persistStore(store);
    
    // If there is any uncaught bug due to redux state
    // uncomment below code to remove persisted state and token
    // persistor.purge();
    // removeToken();

    sagaMiddleware.run(authSaga);
    sagaMiddleware.run(userSaga);
    sagaMiddleware.run(collectionSaga);
    sagaMiddleware.run(restaurantSaga);
    sagaMiddleware.run(weekdaysSaga);

    return { store, persistor };
}

export default getStore;