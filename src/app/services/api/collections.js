import { httpWithToken } from './axios-helper';

export const getCollections = (token, username) => {
    return httpWithToken(token).get(`/api/users/${username}/collections`);
}

export const getCollectionById = (token, username, id) => {
    return httpWithToken(token).get(`/api/users/${username}/collections/${id}`);
}

export const createCollection = (token, username, collectionName) => {
    let data = {
        name : collectionName
    };
    return httpWithToken(token).post(`/api/users/${username}/collections`,data);
}

export const editCollection = (token, username, collectionId, collectionName) => {
    let data = {
        name : collectionName
    };
    return httpWithToken(token).put(`/api/users/${username}/collections/${collectionId}`,data );
}

export const deleteCollection = (token, username, collectionId) => {
    return httpWithToken(token).delete(`/api/users/${username}/collections/${collectionId}`);
}