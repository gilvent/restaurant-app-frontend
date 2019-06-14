export const GET_USER ="USER/ Get User";
export const GET_USER_SUCCESS ="USER/ Get User Success";
export const GET_USER_FAIL ="USER/ Get User Fail";

export const CREATE_USER = "USER/ Create User";
export const CREATE_USER_SUCCESS = "USER/ Create User Success";
export const CREATE_USER_FAIL = "USER/ Create User Fail";

export const GET_USER_COLLECTIONS = "USER/ Get User Collections";
export const GET_USER_COLLECTIONS_SUCCESS = "USER/ Get User Collections Success";
export const GET_USER_COLLECTIONS_FAIL = "USER/ Get User Collections Fail";

export const ADD_USER_COLLECTION = "USER/ Add User Collection";
export const ADD_USER_COLLECTION_SUCCESS = "USER/ Add User Collection Success";
export const ADD_USER_COLLECTION_FAIL = "USER/ Add User Collection Fail";

export const EDIT_USER_COLLECTION = "USER/ Edit User Collection";
export const EDIT_USER_COLLECTION_SUCCESS = "USER/ Edit User Collection Success";
export const EDIT_USER_COLLECTION_FAIL = "USER/ Edit User Collection Fail";

export const REMOVE_USER_COLLECTION = "USER/ Remove User Collection";
export const REMOVE_USER_COLLECTION_SUCCESS = "USER/ Remove User Collection Success";
export const REMOVE_USER_COLLECTION_FAIL = "USER/ Remove User Collection Fail";

// Get User
function GetUser(username){
    return { type: GET_USER, payload: { username } };
}

function GetUserSuccess(userData){
    return { type: GET_USER_SUCCESS, payload: userData };
}

function GetUserFail(message){
    return { type: GET_USER_FAIL, payload: message };
}

// Create User
function CreateUser(email,username,password){
    return { type: CREATE_USER, payload: { email, username, password} };
}

function CreateUserSuccess(userAndToken){
    return { type: CREATE_USER_SUCCESS, payload: userAndToken };
}

function CreateUserFail(payload){
    return { type: CREATE_USER_FAIL, payload };
}

// Get User Collection
function GetUserCollection(username){
    return { type: GET_USER_COLLECTIONS, payload: { username } }
}
function GetUserCollectionSuccess(collections){
    return { type: GET_USER_COLLECTIONS_SUCCESS, payload: collections }
}
function GetUserCollectionFail(message){
    return { type: GET_USER_COLLECTIONS_FAIL, payload: message }
}

// Add User Collection
function AddUserCollection(username, collectionName){
    return { type: ADD_USER_COLLECTION, payload: { username, collectionName } }
}
function AddUserCollectionSuccess(username, newCollection){
    return { type: ADD_USER_COLLECTION_SUCCESS, payload: {username, newCollection} }
}
function AddUserCollectionFail(message){
    return { type: ADD_USER_COLLECTION_FAIL, payload: message }
}

// Edit User Collection
function EditUserCollection(username, collectionId, collectionName){
    return { type: EDIT_USER_COLLECTION, payload: { username, collectionId, collectionName } }
}
function EditUserCollectionSuccess(updatedCollection){
    return { type: EDIT_USER_COLLECTION_SUCCESS, payload: updatedCollection }
}
function EditUserCollectionFail(message){
    return { type: EDIT_USER_COLLECTION_FAIL, payload: message }
}

// Remove User Collection
function RemoveUserCollection(username, collectionId){
    return { type: REMOVE_USER_COLLECTION, payload: { username, collectionId } }
}
function RemoveUserCollectionSuccess(username,removedCollectionId){
    return { type: REMOVE_USER_COLLECTION_SUCCESS, payload: {username,removedCollectionId} }
}
function RemoveUserCollectionFail(message){
    return { type: REMOVE_USER_COLLECTION_FAIL, payload: message }
}

const userActions = {
    GetUser,
    GetUserSuccess,
    GetUserFail,

    CreateUser,
    CreateUserSuccess,
    CreateUserFail,
    
    GetUserCollection,
    GetUserCollectionSuccess,
    GetUserCollectionFail,

    AddUserCollection,
    AddUserCollectionSuccess,
    AddUserCollectionFail,

    EditUserCollection,
    EditUserCollectionSuccess,
    EditUserCollectionFail,

    RemoveUserCollection,
    RemoveUserCollectionSuccess,
    RemoveUserCollectionFail
}

export default userActions;