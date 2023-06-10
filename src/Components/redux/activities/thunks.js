import {
  getActivitiesPending,
  getActivitiesSuccess,
  getActivitiesError,
  deleteActivitiesPending,
  deleteActivitiesSuccess,
  deleteActivitiesError
} from './actions';

export const getActivities = () => {
  return async (dispatch) => {
    dispatch(getActivitiesPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`);
      const data = await response.json();
      dispatch(getActivitiesSuccess(data));
      return data;
    } catch (error) {
      dispatch(getActivitiesError(error.toString()));
    }
  };
};

export const deleteActivities = (id) => {
  return async (dispatch) => {
    dispatch(deleteActivitiesPending());
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
        method: 'DELETE'
      });
      dispatch(deleteActivitiesSuccess(id));
      return { success: true, message: 'Member deleted successfully' };
    } catch (error) {
      dispatch(deleteActivitiesError(error.toString()));
    }
  };
};
