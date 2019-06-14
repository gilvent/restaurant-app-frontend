import { httpWithToken } from './axios-helper';

export const getCollectionCollaborators = (token, username, collectionId) => {
    return httpWithToken(token).get(`/api/users/${username}/collections/${collectionId}/collaborators`);
}

export const addCollectionCollaborator = (token, username, collectionId, email) => {
    let data = {
        email : email
    };
    return httpWithToken(token).post(`/api/users/${username}/collections/${collectionId}/collaborators`,data);
}

export const deleteCollectionCollaborator = (token, username, collectionId, collaboratorUsername) => {
    return httpWithToken(token).delete(`/api/users/${username}/collections/${collectionId}/collaborators/${collaboratorUsername}`);
}