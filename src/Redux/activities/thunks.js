import {
  getActivitiesPending,
  getActivitiesSuccess,
  getActivitiesError,
  deleteActivitiesPending,
  deleteActivitiesSuccess,
  deleteActivitiesError,
  getActivitiesByIdPending,
  getActivitiesByIdSuccess,
  getActivitiesByIdError
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
      dispatch(getActivitiesError(error));
    }
  };
};

export const getActivitiesById = (id) => {
  return async (dispatch) => {
    dispatch(getActivitiesByIdPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
        method: 'GET'
      });
      const { data } = await response.json();
      dispatch(getActivitiesByIdSuccess(data));
      return data;
    } catch (error) {
      dispatch(getActivitiesByIdError(error));
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
