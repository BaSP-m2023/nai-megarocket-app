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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(deleteActivitiesSuccess(id));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(deleteActivitiesError(error));
      throw error;
    }
  };
};
