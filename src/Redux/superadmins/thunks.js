import {
  getSuperAdminsPending,
  getSuperAdminsSuccess,
  getSuperAdminsError,
  deleteSuperAdminsPending,
  deleteSuperAdminsSuccess,
  deleteSuperAdminsError
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

export const deleteSuperAdmin = (id) => {
  return async (dispatch) => {
    dispatch(deleteSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      dispatch(deleteSuperAdminsSuccess(id));
      return data;
    } catch (error) {
      dispatch(deleteSuperAdminsError(error));
    }
  };
};
