// user details action
export const USER_DETAILS = 'USER_DETAILS';

export const userDetails = (data) => {
    return {
        type: USER_DETAILS,
        payload: data
    }
};

export const PLANET_LIST = 'PLANET_LIST';

export const planetList = (data) => {
    return {
        type: PLANET_LIST,
        payload: data
    }
};