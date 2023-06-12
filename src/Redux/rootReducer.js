import { combineReducers } from 'redux';

import membersReducer from './members/reducer';
import trainersReducer from './trainers/reducer';
import activitiesReducer from './activities/reducer';
import superAdminReducer from './superadmins/reducer';
import subscriptionsReducer from './subscriptions/reducer';

const rootReducer = combineReducers({
  // ,admins: adminsReducer,
  activities: activitiesReducer,
  // ,classes: classesReducer
  members: membersReducer,
  subscriptions: subscriptionsReducer,
  superAdmin: superAdminReducer,
  trainers: trainersReducer
});

export default rootReducer;
