import { httpRequest } from './axios-helper';

export const getRestaurants = (params = {}) => {
    return httpRequest.get('/api/restaurants',{
        params
    });
}