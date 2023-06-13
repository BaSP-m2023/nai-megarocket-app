import {
  getSuperAdminsPending,
  getSuperAdminsSuccess,
  getSuperAdminsError,
  deleteSuperAdminsPending,
  deleteSuperAdminsSuccess,
  deleteSuperAdminsError,
  getSuperAdminsIdPending,
  getSuperAdminsIdSuccess,
  getSuperAdminsIdError,
  addSuperAdminsPending,
  addSuperAdminsSuccess,
  addSuperAdminsError,
  updateSuperAdminsPending,
  updateSuperAdminsSuccess,
  updateSuperAdminsError
} from './actions';

export const getSuperAdmins = () => {
  return async (dispatch) => {
    dispatch(getSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`);
      const data = await response.json();
      dispatch(getSuperAdminsSuccess(data));
      return data;
    } catch (error) {
      dispatch(getSuperAdminsError(error));
    }
  };
};

export const getSuperAdminById = (id) => {
  return async (dispatch) => {
    dispatch(getSuperAdminsIdPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
        method: 'GET'
      });
      const { data } = await response.json();
      dispatch(getSuperAdminsIdSuccess(data));
      return data;
    } catch (error) {
      dispatch(getSuperAdminsIdError(error));
    }
  };
};

export const deleteSuperAdmin = (id) => {
  return async (dispatch) => {
    dispatch(deleteSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(deleteSuperAdminsSuccess(id));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(deleteSuperAdminsError(error));
    }
  };
};

export const updateSuperAdmin = (id, superAdmin) => {
  return async (dispatch) => {
    dispatch(updateSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(updateSuperAdminsSuccess({ id, superAdmin }));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(updateSuperAdminsError(error));
    }
  };
};

export const addSuperAdmin = (superAdmin) => {
  return async (dispatch) => {
    dispatch(addSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
      const data = await response.json();
      if (data.ok) {
        dispatch(addSuperAdminsSuccess(data));
      }
    } catch (error) {
      dispatch(addSuperAdminsError(error));
    }
  };
};
