import { fork,call,put,takeEvery,all} from 'redux-saga/effects';
import collectionActions, { 
    GET_COLLECTION_INFO,
    GET_COLLABORATORS, 
    GET_COLLECTION_DETAILS, 
    ADD_COLLECTION_DETAILS,
    REMOVE_COLLECTION_DETAILS,
    ADD_COLLABORATOR,
    SEND_COLLABORATOR_INVITATION
} from 'app/redux/actions/collection';

import { getToken } from 'app/services/local-storage/token';
import { getCollectionById } from 'app/services/api/collections';
import { getCollectionCollaborators, addCollectionCollaborator } from 'app/services/api/collection-collaborators';
import { getCollectionDetails, createCollectionDetails, deleteCollectionDetails } from 'app/services/api/collection-details';
import { sendCollaboratorInvitation } from 'app/services/api/email';

function* GetCollectionInfo(action){
    const { username, collectionId } = action.payload;
    const token = getToken();
    try {
        const response = yield call(getCollectionById,token,username,collectionId);
        if(response.data.data){
            yield put(collectionActions.GetCollectionInfoSuccess(response.data.data));
            yield put(collectionActions.GetCollaborators(username,collectionId));
            yield put(collectionActions.GetCollectionDetails(username,collectionId));
        }
        else {
            yield put(collectionActions.GetCollaboratorsFail("User collection does not exist"));
        }

    }
    catch (err){
        yield put(collectionActions.GetCollectionInfoFail(err.response.data.error)); 
    }
}

function* GetCollaborators(action){
    const { username, collectionId } = action.payload;
    const token = getToken();

    try {
        const response = yield call(getCollectionCollaborators,token,username,collectionId);
        yield put(collectionActions.GetCollaboratorsSuccess(response.data.data));
    }
    catch(err){
        yield put(collectionActions.GetCollaboratorsFail(err.response.data.error));
    }
}

function* GetCollectionDetails(action){
    const { username, collectionId } = action.payload;
    const token = getToken();
    
    try {
        const response = yield call(getCollectionDetails,token,username,collectionId);
        yield put(collectionActions.GetCollectionDetailsSuccess(response.data.data));
    }
    catch(err){
        yield put(collectionActions.GetCollectionDetailsFail(err.response.data.error));
    }
}

function* AddCollectionDetail(action){
    const { username, collectionId, restaurantId } = action.payload;
    const token = getToken();

    try {
        const response = yield call(createCollectionDetails,token,username,collectionId,restaurantId);
        yield put(collectionActions.AddCollectionDetailSuccess(response.data.data));
    }
    catch(err){
        yield put(collectionActions.AddCollectionDetailFail(err.response.data.error));
    }
}

function* RemoveCollectionDetail(action){
    const { username, collectionId, restaurantId } = action.payload;
    const token = getToken();

    try {
        const response = yield call(deleteCollectionDetails,token,username,collectionId,restaurantId);
        yield put(collectionActions.RemoveCollectionDetailSuccess(collectionId,restaurantId));
    }
    catch(err){
        yield put(collectionActions.RemoveCollectionDetailFail(err.response.data.error));
    }
}

function* AddCollaborator(action){
    const { username, collectionId, email } = action.payload;
    const token = getToken();

    try {
        const response = yield call(addCollectionCollaborator,token,username,collectionId,email);
        yield put(collectionActions.AddCollaboratorSuccess(response.data.data));
        yield put(collectionActions.GetCollaborators(username,collectionId));
    }
    catch(err){
        yield put(collectionActions.Add(err.response.data.error));
    }
}

function* SendCollaboratorInvitation(action){
    const { targetEmail, collectionId, collectionName } = action.payload;
    const token = getToken();

    try {
        const response = yield call(sendCollaboratorInvitation,token,targetEmail,collectionId,collectionName);
        yield put(collectionActions.SendCollaboratorInvitationSuccess(response.data.data));
    }
    catch(err){
        yield put(collectionActions.SendCollaboratorInvitationFail(err.response.data.error));
    }
}

// Redux Saga Watchers
function* watchGetCollectionInfo(){
    yield takeEvery(GET_COLLECTION_INFO,GetCollectionInfo);
}

function* watchGetCollaborators(){
    yield takeEvery(GET_COLLABORATORS,GetCollaborators);
}

function* watchGetCollectionDetails(){
    yield takeEvery(GET_COLLECTION_DETAILS,GetCollectionDetails)
}

function* watchAddCollectionDetail(){
    yield takeEvery(ADD_COLLECTION_DETAILS,AddCollectionDetail);
}

function* watchRemoveCollectionDetail(){
    yield takeEvery(REMOVE_COLLECTION_DETAILS, RemoveCollectionDetail);
}

function* watchAddCollaborator(){
    yield takeEvery(ADD_COLLABORATOR, AddCollaborator);
}

function* watchSendCollaboratorInvitation(){
    yield takeEvery(SEND_COLLABORATOR_INVITATION, SendCollaboratorInvitation);
}

export default function* collectionSaga(){
    yield all([
        yield fork(watchGetCollectionInfo),
        yield fork(watchGetCollaborators),
        yield fork(watchGetCollectionDetails),
        yield fork(watchAddCollectionDetail),
        yield fork(watchRemoveCollectionDetail),
        yield fork(watchAddCollaborator),
        yield fork(watchSendCollaboratorInvitation)
    ]);
}