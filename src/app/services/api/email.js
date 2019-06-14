import { httpWithToken } from './axios-helper';


export const sendCollaboratorInvitation = (token,targetEmail,collectionId,collectionName) => {
    let data = {
        targetEmail,
        collectionId,
        collectionName
    }
    return httpWithToken(token).post('/api/email/invite-collaboration',data);
}