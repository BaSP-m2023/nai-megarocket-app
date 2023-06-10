import { combineReducers } from 'redux';

import membersReducer from './members/reducer';

const rootReducer = combineReducers({
  members: membersReducer
  // ,admins: adminsReducer,
  // ,superAdmins: superAdminsReducer
  // ,activities: activitiesReducer
  // ,classes: classesReducer
  // ,subscriptions: subscriptionsReducer
});

export default rootReducer;
