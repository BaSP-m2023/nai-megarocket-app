import { combineReducers } from 'redux';

import membersReducer from 'Redux/members/reducer';
import trainersReducer from 'Redux/trainers/reducer';
import activitiesReducer from 'Redux/activities/reducer';
import superAdminReducer from 'Redux/superadmins/reducer';
import subscriptionsReducer from 'Redux/subscriptions/reducer';
import classesReducer from 'Redux/classes/reducer';
import adminsReducer from 'Redux/admins/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  activities: activitiesReducer,
  classes: classesReducer,
  members: membersReducer,
  subscriptions: subscriptionsReducer,
  superAdmin: superAdminReducer,
  trainers: trainersReducer
});

export default rootReducer;
