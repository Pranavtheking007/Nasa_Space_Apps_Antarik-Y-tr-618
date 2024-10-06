import {combineReducers} from 'redux';
import { planetReducer, userReducer } from './reducer';

const rootReducer = combineReducers({
    user: userReducer,
    exoplanets: planetReducer
});

export default rootReducer;