import { GET_USER_COLLECTIONS_SUCCESS, ADD_USER_COLLECTION_SUCCESS, EDIT_USER_COLLECTION_SUCCESS, REMOVE_USER_COLLECTION_SUCCESS } from "app/redux/actions/user";
import { GET_COLLABORATORS_SUCCESS, GET_COLLECTION_DETAILS_SUCCESS, GET_COLLECTION_INFO, GET_COLLECTION_INFO_SUCCESS, ADD_COLLECTION_DETAILS_SUCCESS, REMOVE_COLLECTION_DETAILS_SUCCESS } from "app/redux/actions/collection";


/**
 * Add / Update a collection 
 * @param {*} state Previous state
 * @param {Object} payload An object containing collection entity from API
 */
const assignCollectionEntry = (state, payload) => {
    let { byId } = state;

    let { collectionId,userEmail,collectionName,updatedBy,updateTime, updater} = payload; 

    let collection = byId[collectionId];

    byId = {
        ...byId,
        [collectionId]: { 
            ...collection,
            collectionId, 
            userEmail, 
            collectionName,
            updatedBy,
            updateTime,
            updaterUsername: updater? updater.username : null,
        }
    }
    
    return {
        ...state,
        byId
    };
}

/**
 * Add / Update a collection 
 * @param {*} state Previous state
 * @param {Object} payload An object containing collection entity from API
 */
const addCollectionEntry = (state, payload) => {
    let { byId, allIds } = state;

    let { collectionId,userEmail,collectionName,updatedBy,updateTime, updater,
          collaborators, details } = payload; 

    if(allIds.indexOf(collectionId) === -1){
        allIds = allIds.concat(collectionId);
    }

    byId = {
        ...byId,
        [collectionId]: { 
            collectionId, 
            userEmail, 
            collectionName,
            updatedBy,
            updateTime,
            updaterUsername: updater? updater.username : null,
            collaborators: collaborators? collaborators.filter(c=> c.collaborator).map(c => c.collaborator.username) : [],
            restaurants: details? details.map(d=>d.restaurantId) : []
        }
    }
    
    return {
        ...state,
        allIds,
        byId
    };
}

/**
 * Remove Collection from the state
 */
const removeCollectionEntry = (state, collectionId) =>{
    let { byId, allIds } = state;
    allIds = allIds.filter(id => id != collectionId);
    delete byId[collectionId];

    return {
        ...state,
        allIds,
        byId
    }
}

/**
 * Add collaborators to existing collection collaborators
 * @param {*} state Previous state
 * @param {string} collectionId Collection id 
 * @param {Array || Object} collaboratorUsernames Usernames of collaborator
 */
const addCollaborators = (state, collectionId, collaboratorUsernames) => {
    const collection = state.byId[collectionId];
    let newCollaborators = collaboratorUsernames.filter(
        username => collection.collaborators.indexOf(username) == -1
    )
    
    return {
        ...state,
        byId: {
            ...state.byId,
            [collectionId]: {
                ...collection,
                collaborators: collection.collaborators.concat(newCollaborators)
            }
        }
    }
}

/**
 * Assign collaborators with new values
 * @param {*} state Previous state
 * @param {string} collectionId Collection id 
 * @param {Array} collaboratorUsernames Usernames of collaborators
 * @param {Array} pendingCollaboratorEmails Invited emails that have not created account, taken from noAccount key from server response
 */
const assignCollaborators = (state, collectionId, collaboratorUsernames, pendingCollaboratorEmails) => {
    const {byId} = state
    const collection = byId[collectionId];
    return {
        ...state,
        byId: {
            ...byId,
            [collectionId]: {
                ...collection,
                collaborators: collaboratorUsernames,
                pendingCollaborators: pendingCollaboratorEmails
            }
        }
    }
}

/**
 * Add restaurants to existing collection
 * @param {*} state Previous state
 * @param {string} collectionId Collection id
 * @param {Array || Object} restaurantIds Restaurant ids
 */
const addRestaurants = (state, collectionId, restaurantIds) => {
    const collection = state.byId[collectionId];
    let newRetaurants = restaurantIds.filter(id => collection.restaurants.indexOf(id)==-1)
    
    return {
        ...state,
        byId: {
            ...state.byId,
            [collectionId]: {
                ...collection,
                restaurants: collection.restaurants.concat(newRetaurants)
            }
        }
    }
}

/**
 * Assign collection restaurants with new values
 * @param {*} state Previous state
 * @param {string} collectionId Collection id
 * @param {Array || Object} restaurantIds Restaurant ids
 */
const assignRestaurants = (state, collectionId, restaurantIds) => {
    const collection = state.byId[collectionId];
    
    return {
        ...state,
        byId: {
            ...state.byId,
            [collectionId]: {
                ...collection,
                restaurants: restaurantIds
            }
        }
    }
}

const removeRestaurant = (state,collectionId,restaurantId) => {
    const { byId } = state;
    const collection = byId[collectionId];
    return {
        ...state,
        byId: {
            ...byId,
            [collectionId] : {
                ...collection,
                restaurants: collection.restaurants.filter(id => id != restaurantId)
            }
        }
    }
}

let initialState = {
    byId: {
        // ... collection data
        // collaborators: []
        // pendingCollaborators: [] 
        // restaurants: []
    },
    allIds: []
}

const collectionReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_COLLECTION_INFO_SUCCESS:
            return addCollectionEntry(state,action.payload);

        case EDIT_USER_COLLECTION_SUCCESS:
            return assignCollectionEntry(state,action.payload);
            
        case GET_USER_COLLECTIONS_SUCCESS:
            const { collections } = action.payload;
            return collections.reduce((state,collection) => addCollectionEntry(state,collection),state);

        case ADD_USER_COLLECTION_SUCCESS:
            const { newCollection } = action.payload;
            return addCollectionEntry(state,newCollection);
        
        case REMOVE_USER_COLLECTION_SUCCESS:
            const { removedCollectionId } = action.payload;
            return removeCollectionEntry(state,removedCollectionId);

        case GET_COLLABORATORS_SUCCESS:
            const { collaborators, noAccount } = action.payload;
            let collaboratorUsernames = collaborators.map(x=> x.username);
            return assignCollaborators(state, action.payload.collectionId, collaboratorUsernames,noAccount);

        case GET_COLLECTION_DETAILS_SUCCESS:
            const { restaurants } = action.payload;
            let restaurantIds = restaurants.map(x=>x.id);
            return assignRestaurants(state,action.payload.collectionId,restaurantIds);

        case ADD_COLLECTION_DETAILS_SUCCESS: {
            const { collectionId, restaurantId } = action.payload;
            return addRestaurants(state,collectionId,[restaurantId]);
        }
            
        case REMOVE_COLLECTION_DETAILS_SUCCESS: {
            const { collectionId, removedRestaurantId } = action.payload;
            return removeRestaurant(state,collectionId,removedRestaurantId);
        }
            
        
        default: return state;
    }
}

export default collectionReducer;