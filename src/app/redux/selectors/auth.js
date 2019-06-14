const getAuthState = (state) => state.auth;
const getIsLoggedIn = (state) => state.auth.isLoggedIn;
const getMyUsername = (state) => state.auth.myUsername;


const authSelectors = {
    getAuthState,
    getIsLoggedIn,
    getMyUsername
}

export default authSelectors;