import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
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
