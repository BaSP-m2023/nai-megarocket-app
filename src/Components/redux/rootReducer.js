import { combineReducers } from 'redux';

import membersReducer from './members/reducer';

const rootReducer = combineReducers({
  members: membersReducer
});

export default rootReducer;
