import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  getAdminByIdPending,
  getAdminByIdSuccess,
  getAdminByIdError,
  deleteAdminPending,
  deleteAdminSuccess,
  deleteAdminError
} from './actions';

export const getAdmins = () => {
  return async (dispatch) => {
    dispatch(getAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
      const data = await response.json();
      dispatch(getAdminsSuccess(data.data));
    } catch (error) {
      dispatch(getAdminsError(error));
    }
  };
};

export const getAdminById = (id) => {
  return async (dispatch) => {
    dispatch(getAdminByIdPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
        method: 'GET'
      });
      const data = await response.json();
      dispatch(getAdminByIdSuccess(data.data));
      return data;
    } catch (error) {
      dispatch(getAdminByIdError(error));
    }
  };
};

export const deleteAdmin = (adminId) => {
  return async (dispatch) => {
    dispatch(deleteAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${adminId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(deleteAdminSuccess(adminId));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(deleteAdminError(error.message));
      throw error;
    }
  };
};
