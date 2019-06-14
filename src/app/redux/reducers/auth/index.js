import { 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT_SUCCESS, 
    VERIFY_TOKEN_FAIL,
    VERIFY_TOKEN_SUCCESS,
    SIGNOUT_SUCCESS
} from 'app/redux/actions/auth';
import { CREATE_USER_SUCCESS } from 'app/redux/actions/user';

const initialState ={
    isLoggedIn : false,
    firstLogin : true,
    myUsername: null,
    redirectionUrl : null
};

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_SUCCESS: 
        case CREATE_USER_SUCCESS:
        case VERIFY_TOKEN_SUCCESS:
            const { username } = action.payload;
            return {...state, isLoggedIn: true, myUsername: username};

        case LOGIN_FAIL:
            return { ...state, isLoggedIn: false, myUsername: null};

        case VERIFY_TOKEN_FAIL:
            return {...state, isLoggedIn: false, myUsername: null, redirectionUrl : action.payload.redirectionUrl};
        
        case SIGNOUT_SUCCESS:
        return {...state, isLoggedIn: false, myUsername: null, redirectionUrl : null};
        
        default : return state;
    }
}

export default authReducer;