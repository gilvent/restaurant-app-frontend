import { httpWithToken } from './axios-helper';

export const getCollectionDetails = (token, username, collectionId) => {
    return httpWithToken(token).get(`/api/users/${username}/collections/${collectionId}/details`);
}

export const createCollectionDetails = (token, username, collectionId, restaurantId) => {
    let data = {
        restaurantId : restaurantId
    };
    return httpWithToken(token).post(`/api/users/${username}/collections/${collectionId}/details`,data);
}

export const deleteCollectionDetails = (token, username, collectionId, restaurantId) => {
    return httpWithToken(token).delete(`/api/users/${username}/collections/${collectionId}/details/${restaurantId}`);
}