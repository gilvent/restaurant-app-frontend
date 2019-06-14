import {
    LOGIN_SUCCESS
} from 'app/redux/actions/auth';

import {
   GET_USER_SUCCESS, GET_USER_COLLECTIONS_SUCCESS, CREATE_USER_SUCCESS, ADD_USER_COLLECTION_SUCCESS, REMOVE_USER_COLLECTION_SUCCESS,
} from 'app/redux/actions/user';

import {
    GET_COLLABORATORS_SUCCESS, GET_COLLECTION_INFO_SUCCESS
} from 'app/redux/actions/collection';

/**
 * Add single user to the state
 * @param {*} state Previous state
 * @param {Object} payload An object containing username and email
 */
const addUserEntry = (state, payload) => {
    let { byUsername, allUsernames } = state;
    let { username, email, collections } = payload; 

    if(allUsernames.indexOf(username) === -1){
        allUsernames = allUsernames.concat(username);
    }
    
    byUsername = {
        ...byUsername,
        [username]: { username, email, collections: collections || [] }
    }
    
    return {
        ...state,
        allUsernames,
        byUsername
    };
}

/**
 * Add collections to existing user collections
 * @param {*} state Previous state
 * @param {string} username Username of collection owner 
 * @param {Array || Object} collectionId New collection ids to be added 
 */
const addCollections = (state, username, collectionIds) => {
    const user = state.byUsername[username];
    if(!user.collections){
        user.collections = []
    }

    let newCollectionIds = collectionIds.filter(id => user.collections.indexOf(id) == -1);

    return {
        ...state,
        byUsername: {
            ...state.byUsername,
            [username]: {
                ...user,
                collections: user.collections.concat(newCollectionIds)
            }
        }
    }

}

/**
 * Assign user collections with new values received from server
 * @param {*} state Previous state
 * @param {*} username Username of collection owner 
 * @param {*} collectionIds New collection ids
 */
const assignCollections = (state, username, collectionIds) => {
    const user = state.byUsername[username];
    if(!user.collections){
        user.collections = []
    }

    return {
        ...state,
        byUsername: {
            ...state.byUsername,
            [username]: {
                ...user,
                collections: collectionIds
            }
        }
    }
}

const removeCollection = (state, username, collectionId) => {
    const { byUsername } = state;
    const user = byUsername[username];
    return {
        ...state,
        byUsername: {
            ...byUsername,
            [username] : {
                ...user,
                collections: user.collections.filter(id => id != collectionId)
            }
        }
    }
}

let initialState = {
    allUsernames: [],
    byUsername: {}
}


const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_SUCCESS:
        case CREATE_USER_SUCCESS:
        case GET_USER_SUCCESS:
            return addUserEntry(state,action.payload);

        case GET_COLLECTION_INFO_SUCCESS: {
            const { user, collectionId } = action.payload;
            let userEntity = {
                ...user,
                collections: [collectionId]
            }
            return addUserEntry(state,userEntity);
        }

        case GET_USER_COLLECTIONS_SUCCESS: {
            const { username, collections } = action.payload;
            let collectionIds = collections.map(x=> x.collectionId);
            return assignCollections(state, username, collectionIds);
        }

        case ADD_USER_COLLECTION_SUCCESS: {
            const { username:ownerUsername, newCollection } = action.payload;
            return addCollections(state,ownerUsername,[newCollection.collectionId]);
        }

        case REMOVE_USER_COLLECTION_SUCCESS: {
            const { username, removedCollectionId } = action.payload;
            return removeCollection(state,username,removedCollectionId);
        }
            

        case GET_COLLABORATORS_SUCCESS: {
            const { collaborators } = action.payload;
            return collaborators.reduce((state,collaborator)=>  addUserEntry(state,collaborator),state)
        }

        default: return state;

    }
}


export default usersReducer;