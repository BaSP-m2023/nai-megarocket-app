import * as actions from './actions';

const token = sessionStorage.getItem('token');

export const getClasses = () => {
  return async (dispatch) => {
    try {
      dispatch(actions.getClassesPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token
        }
      });
      const data = await response.json();
      dispatch(actions.getClassesSuccess(data));
      return data;
    } catch (error) {
      dispatch(actions.getClassesError(error));
    }
  };
};

export const getClassById = (id) => {
  return async (dispatch) => {
    dispatch(actions.getClassByIdPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token
        }
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(actions.getClassByIdSuccess(id));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(actions.getClassByIdError(error));
      throw error;
    }
  };
};

export const addClass = (gymClass) => {
  return async (dispatch) => {
    dispatch(actions.postClassPending);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify(gymClass)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(actions.postClassSuccess({ gymClass }));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(actions.postClassError(error));
      throw error;
    }
  };
};

export const editClass = (id, gymClass) => {
  return async (dispatch) => {
    dispatch(actions.putClassPending);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify(gymClass)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(actions.putClassSuccess(id, gymClass));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(actions.putClassError(error));
      throw error;
    }
  };
};

export const deleteClass = (id) => {
  return async (dispatch) => {
    dispatch(actions.deleteClassPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: token
        }
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(actions.deleteClassSuccess(id));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(actions.deleteClassError(error));
      throw error;
    }
  };
};
