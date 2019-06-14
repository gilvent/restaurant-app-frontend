import axios from 'axios';

import { environment } from 'environment/dev.environment';

export const httpRequest = axios.create({
    baseURL: environment.BACKEND_URL,
    headers: {
        'content-type': 'application/json',
        'accept': 'application/json' 
    }
});

export const httpWithToken = (token) => {
    httpRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return httpRequest;
} 