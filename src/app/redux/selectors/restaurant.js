import { createSelector } from "reselect";

const getRestaurantState = (state) => state.entities.restaurants;
const getAllIds = (state) => state.entities.restaurants.allIds;
const getById = (state) => state.entities.restaurants.byId;

const getAllRestaurants = createSelector(getAllIds,getById, 
        (ids,byId) => ids.map(id => byId[id])
    )
const getRestaurantById = (id) => createSelector(getById, byId => byId[id] || null);

const restaurantSelectors = {
    getRestaurantState,
    getAllIds,
    getById,
    
    getAllRestaurants,
    getRestaurantById,
}

export default restaurantSelectors;