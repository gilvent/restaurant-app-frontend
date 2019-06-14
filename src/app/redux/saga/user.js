import { fork,call,takeEvery,put, all} from 'redux-saga/effects';

import userActions, { 
    CREATE_USER, 
    GET_USER_COLLECTIONS, 
    ADD_USER_COLLECTION, 
    REMOVE_USER_COLLECTION, 
    EDIT_USER_COLLECTION, GET_USER 
} from 'app/redux/actions/user';
import { createUser, getUser } from 'app/services/api/users';
import { setToken, getToken } from 'app/services/local-storage/token';
import { getCollections, createCollection, editCollection, deleteCollection } from 'app/services/api/collections';

function* GetUser(action){
    const { username } = action.payload;
    try {
        const response = yield call(getUser,username);
        yield put(userActions.GetUserSuccess(response.data.data));
    }
    catch(error) { 
        yield put(userActions.GetUserFail(error.response.data.error));
    }
}

function* CreateUser(action){
    const { username,email,password } = action.payload;
    try {
        const response = yield call(createUser,email,username,password);
        if(!response.data.error){
            yield fork(setToken,response.data.data.token);
            yield put(userActions.CreateUserSuccess(response.data.data));
        }
        else{
            yield put(userActions.CreateUserFail(response.data.error));
        }
    }
    catch(error){
        yield put(userActions.CreateUserFail(error.response.data.error));
    }
}

function* GetUserCollections(action){
    const { username } = action.payload;
    const token = getToken();
    try {
        const response = yield call(getCollections,token,username);
        yield put(userActions.GetUserCollectionSuccess(response.data.data));
    }
    catch(error){
        yield put(userActions.GetUserCollectionFail(error.response.data.error));
    }
}

function* AddUserCollection(action){
    const { username, collectionName } = action.payload;
    const token = getToken();
    try{
        const response = yield call(createCollection,token,username,collectionName);
        yield put(userActions.AddUserCollectionSuccess(response.data.data["username"], response.data.data["newCollection"]));
    }
    catch(error){
        yield put(userActions.AddUserCollectionFail(error.response.data.error))
    }
}

function* EditUserCollection(action){
    const { username, collectionId, collectionName } = action.payload;
    const token = getToken();
    try{
        const response = yield call(editCollection,token,username,collectionId,collectionName);
        yield put(userActions.EditUserCollectionSuccess(response.data.data["updatedCollection"][0]));
    }
    catch(error){
        yield put(userActions.EditUserCollectionFail(error.response.data.error))
    }
}

function* RemoveUserCollection(action){
    const { username, collectionId, collectionName } = action.payload;
    const token = getToken();
    try{
        const response = yield call(deleteCollection,token,username,collectionId,collectionName);
        if(response.data.data.deletedCollection != 0){
            yield put(userActions.RemoveUserCollectionSuccess(username,collectionId));
            //yield put(userActions.GetUserCollection(username));
        }
        else{
            yield put(userActions.RemoveUserCollectionFail("No data being deleted"))
        }
    }
    catch(error){
        yield put(userActions.RemoveUserCollectionFail(error.response.data.error))
    }
}


// Redux Saga Watchers
function* watchGetUser(){
    yield takeEvery(GET_USER, GetUser);
}

function* watchCreateUser(){
    yield takeEvery(CREATE_USER,CreateUser);
}

function* watchGetUserCollections(){
    yield takeEvery(GET_USER_COLLECTIONS,GetUserCollections);
}

function* watchAddUserCollection(){
    yield takeEvery(ADD_USER_COLLECTION,AddUserCollection);
}

function* watchEditUserCollection(){
    yield takeEvery(EDIT_USER_COLLECTION,EditUserCollection);
} 

function* watchRemoveUserCollection(){
    yield takeEvery(REMOVE_USER_COLLECTION,RemoveUserCollection);
}


export default function* userSaga() {
    yield all([
        fork(watchGetUser),
        fork(watchCreateUser),
        fork(watchGetUserCollections),
        fork(watchAddUserCollection),
        fork(watchEditUserCollection),
        fork(watchRemoveUserCollection)
    ]);
}