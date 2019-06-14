import { createSelector } from "reselect";

import restaurantSelectors from './restaurant';
import userSelectors from './user';

const getCollectionState = (state) => state.entities.collections;
const getAllIds = (state) => state.entities.collections.allIds;
const getById = (state) => state.entities.collections.byId;

const getCollectionById = (id) => createSelector(getById, byId => byId[id] || null);
const getCollectionDetails = (id) => createSelector(getCollectionById(id), restaurantSelectors.getById,
    (collection,restaurantById) => collection ?  collection['restaurants'].map( restaurantId => restaurantById[restaurantId]) : []
);
const getCollaborators = (id) => createSelector(getCollectionById(id), userSelectors.getByUsername,
    (collection,users) => collection ? collection['collaborators'].map( username => users[username]) : []
);
const getPendingCollaborators = (id) => createSelector(getCollectionById(id),
    collection => collection ? collection["pendingCollaborators"] : []);


const collectionSelectors = {
    getCollectionState,
    getAllIds,
    getById,

    getCollectionById,
    getCollectionDetails,
    getCollaborators,
    getPendingCollaborators
}

export default collectionSelectors;