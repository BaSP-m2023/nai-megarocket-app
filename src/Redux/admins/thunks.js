import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  getAdminByIdPending,
  getAdminByIdSuccess,
  getAdminByIdError,
  deleteAdminPending,
  deleteAdminSuccess,
  deleteAdminError,
  putAdminPending,
  putAdminSuccess,
  putAdminError,
  postAdminPending,
  postAdminSuccess,
  postAdminError
} from './actions';

const token = sessionStorage.getItem('token');

export const getAdmins = () => {
  return async (dispatch) => {
    dispatch(getAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
        method: 'GET',
        headers: { token: token }
      });
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
        method: 'GET',
        headers: { token: token }
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
        method: 'DELETE',
        headers: { token: token }
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

export const putAdmin = (id, admin) => {
  return async (dispatch) => {
    dispatch(putAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify(admin)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(putAdminSuccess(id, admin));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(putAdminError(error));
      throw error;
    }
  };
};

export const postAdmin = (admin) => {
  return async (dispatch) => {
    dispatch(postAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify(admin)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(postAdminSuccess({ admin }));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(postAdminError(error));
      throw error;
    }
  };
};
