import { createSelector } from 'reselect';

import restaurantSelectors from './restaurant';

const getRestaurantSearchState = (state) => state.search.restaurants;
const getSearchResultIds = (state) => state.search.restaurants.resultIds;
const getSearchFilters = (state) => state.search.restaurants.filters;

const getSearchedRestaurants = createSelector(getSearchResultIds,restaurantSelectors.getById, (ids,restaurants) => ids.map(id => restaurants[id]));

const searchSelectors = {
    getSearchedRestaurants,
    getSearchFilters,
}

export default searchSelectors;