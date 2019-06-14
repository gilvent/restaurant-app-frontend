import { httpRequest } from './axios-helper';

export const getUser = (username) => {
    return httpRequest('/api/users/' + username);
}

export const createUser = (email,username,password) => {
    let data = {
        email: email,
        username: username,
        password: password
    }
    return httpRequest.post('/api/users',data);
}