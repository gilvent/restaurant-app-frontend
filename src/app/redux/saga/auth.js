import { fork, call, put, takeEvery, all} from 'redux-saga/effects';
import storage from 'redux-persist/lib/storage';

import authActions, { 
    LOGIN, 
    VERIFY_TOKEN, 
    SIGNOUT 
} from 'app/redux/actions/auth';
import { signIn, verifyToken } from 'app/services/api/auth';
import { setToken, getToken, removeToken } from 'app/services/local-storage/token';

function* Login(action){
    const { email,password } = action.payload;
    try{
        const response = yield call(signIn,email,password);
        if(!response.data.error){
            yield fork(setToken,response.data.data.token);
            yield put(authActions.LoginSuccess(response.data.data));
        }
        else{
            yield put(authActions.LoginFail(response.data.error));
        }
    }
    catch(error){
        yield put(authActions.LoginFail(error.response.data.error));
    }
    
}

function* VerifyToken(action){
    const { redirectionUrl } = action.payload;
    const token = getToken();
    if(!token){
        yield put(authActions.VerifyTokenFail("No token is present",redirectionUrl));
    }
    else {
        try {
            const response = yield call(verifyToken,token);
            
            yield put(authActions.VerifyTokenSuccess(response.data.data))
            
        }
        catch(error){
            yield put(authActions.VerifyTokenFail(error.response.data.error,redirectionUrl))
        }
    }
}

function* SignOut(action){
    // remove token
    removeToken();

    // remove persisted redux state
    storage.removeItem('persist:root');
    yield put(authActions.SignOutSuccess());
}


// Redux Saga Watchers
function* watchLogin(){
    yield takeEvery(LOGIN,Login);
}

function* watchVerifyToken(){
    yield takeEvery(VERIFY_TOKEN,VerifyToken);
}

function* watchSignOut(){
    yield takeEvery(SIGNOUT, SignOut);
}

export default function* authSaga() {
    yield all([
        fork(watchLogin),
        fork(watchVerifyToken),
        fork(watchSignOut)
    ]);
}