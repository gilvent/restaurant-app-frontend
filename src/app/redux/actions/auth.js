//action constants
export const LOGIN = "AUTH/ Login";
export const LOGIN_SUCCESS = "AUTH/ Login Success";
export const LOGIN_FAIL = "AUTH/ Login Fail";
export const LOGOUT = "AUTH/ Logout";
export const LOGOUT_SUCCESS = "AUTH/ Logout Success";

export const VERIFY_TOKEN = "AUTH/ Verify Token";
export const VERIFY_TOKEN_SUCCESS = "AUTH/ Verify Token Success";
export const VERIFY_TOKEN_FAIL = "AUTH/ Verify Token Fail";

export const SIGNOUT = "AUTH/ Sign Out";
export const SIGNOUT_SUCCESS ="AUTH/ Sign Out Success";


//action creators

function Login(email,password){
    return { type: LOGIN, payload : {email,password} }
}
function LoginSuccess(payload){
    return { type: LOGIN_SUCCESS, payload }
}
function LoginFail(payload){
    return { type: LOGIN_FAIL, payload }
}

function Logout(){
    return { type: LOGOUT }
}

function LogoutSuccess(payload){
    return { type: LOGOUT_SUCCESS, payload }
}


function VerifyToken(redirectionUrl){
    return { type: VERIFY_TOKEN, payload : {redirectionUrl} }
}

function VerifyTokenSuccess(user){
    return { type: VERIFY_TOKEN_SUCCESS, payload: user }
}

function VerifyTokenFail(error, redirectionUrl){
    return { type: VERIFY_TOKEN_FAIL, payload: {error,redirectionUrl} }
}


function SignOut(){
    return { type: SIGNOUT}
}
function SignOutSuccess(){
    return { type: SIGNOUT_SUCCESS}
}


const authActions = {
    Login,
    LoginSuccess,
    LoginFail,
    LogoutSuccess,
    Logout,
    VerifyToken,
    VerifyTokenSuccess,
    VerifyTokenFail,
    SignOut,
    SignOutSuccess
}

export default authActions;