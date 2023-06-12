import { combineReducers } from 'redux';

import membersReducer from './members/reducer';
import subscriptionsReducer from './subscriptions/reducer';

const rootReducer = combineReducers({
  members: membersReducer,
  subscriptions: subscriptionsReducer
  // ,admins: adminsReducer,
  // ,superAdmins: superAdminsReducer
  // ,activities: activitiesReducer
  // ,classes: classesReducer
});

export default rootReducer;
