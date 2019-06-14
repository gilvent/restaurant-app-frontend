import { httpRequest, httpWithToken } from './axios-helper';

export const signIn = (email,password) => {
    let body = {
        email: email,
        password: password
    }
    return httpRequest.post('/api/auth/signin',body);
}

export const verifyToken = (token) => {
    return httpWithToken(token).post('api/auth/verify');
}