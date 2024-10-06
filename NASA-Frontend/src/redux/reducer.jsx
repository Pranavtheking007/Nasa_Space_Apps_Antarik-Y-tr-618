import { USER_DETAILS } from "./action";

// initial state
const initialState = {
    user: null
};

// reducer
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_DETAILS:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
};

export {userReducer};

import { PLANET_LIST } from "./action";

// initial state
const planetInitialState = {
    exoplanets: []
};

// reducer
const planetReducer = (state = planetInitialState, action) => {
    switch (action.type) {
        case PLANET_LIST:
            return {
                ...state,
                exoplanets: action.payload
            };
        default:
            return state;
    }
};

export {planetReducer};