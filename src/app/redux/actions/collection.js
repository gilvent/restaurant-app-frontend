export const GET_COLLECTION_INFO = "COLLECTION/ Get Collection Info";
export const GET_COLLECTION_INFO_SUCCESS = "COLLECTION/ Get Collection Info Success";
export const GET_COLLECTION_INFO_FAIL = "COLLECTION/ Get Collection Info Fail";

export const GET_COLLECTION_DETAILS = "COLLECTION/ Get Collection Details";
export const GET_COLLECTION_DETAILS_SUCCESS = "COLLECTION/ Get Collection Details Success";
export const GET_COLLECTION_DETAILS_FAIL = "COLLECTION/ Get Collection Details Fail";

export const ADD_COLLECTION_DETAILS = "COLLECTION/ Add Collecton Details";
export const ADD_COLLECTION_DETAILS_SUCCESS = "COLLECTION/ Add Collection Details Success";
export const ADD_COLLECTION_DETAILS_FAIL = "COLLECTION/ Add Collection Details Fail";

export const REMOVE_COLLECTION_DETAILS = "COLLECTION/ Remove Collecton Details";
export const REMOVE_COLLECTION_DETAILS_SUCCESS = "COLLECTION/ Remove Collection Details Success";
export const REMOVE_COLLECTION_DETAILS_FAIL = "COLLECTION/ Remove Collection Details Fail";

export const GET_COLLABORATORS = "COLLECTION/ Get Collaborators";
export const GET_COLLABORATORS_SUCCESS = "COLLECTION/ Get Collaborators Success";
export const GET_COLLABORATORS_FAIL = "COLLECTION/ Get Collaborators Fail";

export const ADD_COLLABORATOR = "COLLECTION/ Add Collaborator";
export const ADD_COLLABORATOR_SUCCESS = "COLLECTION/ Add Collaborator Success";
export const ADD_COLLABORATOR_FAIL = "COLLECTION/ Add Collaborator Fail";

export const SEND_COLLABORATOR_INVITATION = "EMAIL/ Send Collaborator Invitation";
export const SEND_COLLABORATOR_INVITATION_SUCCESS = "EMAIL/ Send Collaborator Invitation Success";
export const SEND_COLLABORATOR_INVITATION_FAIL = "EMAIL/ Send Collaborator Invitation Fail";

// Get Collection Info
function GetCollectionInfo(username,collectionId){
    return { type: GET_COLLECTION_INFO, payload: { username, collectionId} }
}

function GetCollectionInfoSuccess(data){
    return { type: GET_COLLECTION_INFO_SUCCESS, payload: data}
}

function GetCollectionInfoFail(payload){
    return { type: GET_COLLECTION_INFO_FAIL, payload }
}

// Get Details
function GetCollectionDetails(username,collectionId){
    return { type: GET_COLLECTION_DETAILS, payload: { username, collectionId} }
}

function GetCollectionDetailsSuccess(data){
    return { type: GET_COLLECTION_DETAILS_SUCCESS, payload: data}
}

function GetCollectionDetailsFail(payload){
    return { type: GET_COLLECTION_DETAILS_FAIL, payload }
}

// Add Detail
function AddCollectionDetail(username,collectionId,restaurantId){
    return { type: ADD_COLLECTION_DETAILS, payload: { username, collectionId, restaurantId} }
}

function AddCollectionDetailSuccess(data){
    return { type: ADD_COLLECTION_DETAILS_SUCCESS, payload: data}
}

function AddCollectionDetailFail(payload){
    return { type: ADD_COLLECTION_DETAILS_FAIL, payload }
}

// Remove Detail
function RemoveCollectionDetail(username,collectionId,restaurantId){
    return { type: REMOVE_COLLECTION_DETAILS, payload: { username, collectionId, restaurantId} }
}

function RemoveCollectionDetailSuccess(collectionId,removedRestaurantId){
    return { type: REMOVE_COLLECTION_DETAILS_SUCCESS, payload: {collectionId,removedRestaurantId}}
}

function RemoveCollectionDetailFail(payload){
    return { type: REMOVE_COLLECTION_DETAILS_FAIL, payload }
}


// Get Collaborators
function GetCollaborators(username,collectionId){
    return { type: GET_COLLABORATORS, payload: { username, collectionId } }
}

function GetCollaboratorsSuccess(data){
    return { type: GET_COLLABORATORS_SUCCESS, payload: data }
}

function GetCollaboratorsFail(payload){
    return { type: GET_COLLABORATORS_FAIL, payload }
}

// Add Collaborator
function AddCollaborator(username,collectionId,collaboratorEmail){
    return { type: ADD_COLLABORATOR, payload: {username, collectionId, email: collaboratorEmail} }
}

function AddCollaboratorSuccess(data){
    return { type: ADD_COLLABORATOR_SUCCESS, payload: data }
}

function AddCollaboratorFail(data){
    return { type: ADD_COLLABORATOR_FAIL, payload: data }
}

function SendCollaboratorInvitation(targetEmail,collectionId,collectionName){
    return { type: SEND_COLLABORATOR_INVITATION , payload: { targetEmail,collectionId,collectionName }}
}

function SendCollaboratorInvitationSuccess(data){
    return { type: SEND_COLLABORATOR_INVITATION_SUCCESS , payload: data}
}

function SendCollaboratorInvitationFail(message){
    return { type: SEND_COLLABORATOR_INVITATION_FAIL , payload: message}
}

const collectionActions = {
    GetCollectionInfo,
    GetCollectionInfoSuccess,
    GetCollectionInfoFail,
    
    GetCollectionDetails,
    GetCollectionDetailsSuccess,
    GetCollectionDetailsFail,

    AddCollectionDetail,
    AddCollectionDetailSuccess,
    AddCollectionDetailFail,

    RemoveCollectionDetail,
    RemoveCollectionDetailSuccess,
    RemoveCollectionDetailFail,

    GetCollaborators,
    GetCollaboratorsSuccess,
    GetCollaboratorsFail,
    
    AddCollaborator,
    AddCollaboratorSuccess,
    AddCollaboratorFail,

    SendCollaboratorInvitation,
    SendCollaboratorInvitationSuccess,
    SendCollaboratorInvitationFail
}

export default collectionActions;