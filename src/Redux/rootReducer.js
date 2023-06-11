import { combineReducers } from 'redux';

import membersReducer from './members/reducer';
import trainersReducer from './trainers/reducer';
import activitiesReducer from './activities/reducer';

const rootReducer = combineReducers({
  // ,admins: adminsReducer,
  activities: activitiesReducer,
  // ,classes: classesReducer
  members: membersReducer,
  // ,subscriptions: subscriptionsReducer
  // ,superAdmins: superAdminsReducer
  trainers: trainersReducer
});

export default rootReducer;
