import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_ERROR
} from './constants';

export const getAdminsPending = () => ({
  type: GET_ADMINS_PENDING
});

export const getAdminsSuccess = (data) => ({
  type: GET_ADMINS_SUCCESS,
  payload: data
});

export const getAdminsError = (error) => ({
  type: GET_ADMINS_ERROR,
  payload: error
});

export const deleteAdminPending = () => ({
  type: DELETE_ADMIN_PENDING
});

export const deleteAdminSuccess = (id) => ({
  type: DELETE_ADMIN_SUCCESS,
  payload: id
});

export const deleteAdminError = (error) => ({
  type: DELETE_ADMIN_ERROR,
  payload: error
});
