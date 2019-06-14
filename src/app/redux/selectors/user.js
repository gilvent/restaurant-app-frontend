import { createSelector } from "reselect";

import collectionSelectors from './collection';

const getUserState = (state) => state.entities.users;
const getAllUsernames = (state) => state.entities.users.allUsernames;
const getByUsername = (state) => state.entities.users.byUsername;

const getUserByUsername = (username) => createSelector(getByUsername, byUsername => byUsername[username] || null);
const getUserCollections = (username) => createSelector(getByUsername, collectionSelectors.getById,
    (users,collections) => users[username].collections.map(id => collections[id])
);
const isUsersCollection = (username, collectionId) => createSelector(getByUsername, 
    users => users[username].collections.find(id => id == collectionId) ? true : false
);

const userSelectors = {
    getUserState,
    getAllUsernames,
    getByUsername,

    getUserByUsername,
    getUserCollections,

    isUsersCollection
}

export default userSelectors;