import {combineReducers} from 'redux';
import MainReducers from './main';

const allReducers = combineReducers({
    main: MainReducers
});

export default allReducers