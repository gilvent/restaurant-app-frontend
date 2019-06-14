import { httpRequest } from './axios-helper';

export const getWeekdays = () => {
    return httpRequest.get('/api/weekdays');
}