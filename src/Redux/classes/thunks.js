import {
  getClassesPending,
  getClassesSuccess,
  getClassesError,
  getClassByIdPending,
  getClassByIdSuccess,
  getClassByIdError,
  deleteClassPending,
  deleteClassSuccess,
  deleteClassError
} from './actions';

export const getClasses = () => {
  return async (dispatch) => {
    dispatch(getClassesPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes`);
      const data = await response.json();
      dispatch(getClassesSuccess(data));
      return data;
    } catch (error) {
      dispatch(getClassesError(error));
    }
  };
};

export const getClassById = (id) => {
  return async (dispatch) => {
    dispatch(getClassByIdPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${id}`);
      const data = await response.json();
      if (response.ok) {
        dispatch(getClassByIdSuccess(id));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(getClassByIdError(error));
      throw error;
    }
  };
};

export const deleteClass = (id) => {
  return async (dispatch) => {
    dispatch(deleteClassPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(deleteClassSuccess(id));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(deleteClassError(error));
      throw error;
    }
  };
};
