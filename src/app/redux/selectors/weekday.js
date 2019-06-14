import { createSelector } from "reselect";


const getWeekdayState = (state) => state.entities.weekdays;
const getAllIds = (state) => state.entities.weekdays.allIds;
const getById = (state) => state.entities.weekdays.byId;

const getAllWeekdays = createSelector(getAllIds, getById, (ids,byId)=> ids.map(id => byId[id]));

const weekdaySelectors = {
    getWeekdayState,
    getAllIds,
    getById,

    getAllWeekdays
}

export default weekdaySelectors;