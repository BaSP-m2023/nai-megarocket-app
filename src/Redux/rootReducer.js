import { combineReducers } from 'redux';

import membersReducer from './members/reducer';
import superAdminReducer from './superadmins/reducer';

const rootReducer = combineReducers({
  members: membersReducer,
  superAdmin: superAdminReducer
  // ,admins: adminsReducer,
  // ,superAdmins: superAdminsReducer
  // ,activities: activitiesReducer
  // ,classes: classesReducer
  // ,subscriptions: subscriptionsReducer
});

export default rootReducer;
