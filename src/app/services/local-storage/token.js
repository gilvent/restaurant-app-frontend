export const getToken = () => {
    return localStorage.getItem('restaurantApiToken');
}

export const setToken = (token) => {
    return localStorage.setItem('restaurantApiToken',token);
}

export const removeToken = () => {
    return localStorage.removeItem('restaurantApiToken');
}

