import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  GET_ADMIN_BY_ID_PENDING,
  GET_ADMIN_BY_ID_SUCCESS,
  GET_ADMIN_BY_ID_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_ERROR,
  PUT_ADMIN_PENDING,
  PUT_ADMIN_SUCCESS,
  PUT_ADMIN_ERROR,
  POST_ADMIN_PENDING,
  POST_ADMIN_SUCCESS,
  POST_ADMIN_ERROR
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

export const getAdminByIdPending = () => ({
  type: GET_ADMIN_BY_ID_PENDING
});

export const getAdminByIdSuccess = (data) => ({
  type: GET_ADMIN_BY_ID_SUCCESS,
  payload: data
});

export const getAdminByIdError = (error) => ({
  type: GET_ADMIN_BY_ID_ERROR,
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

export const putAdminPending = () => {
  return {
    type: PUT_ADMIN_PENDING
  };
};

export const putAdminSuccess = (id) => {
  return {
    type: PUT_ADMIN_SUCCESS,
    payload: id
  };
};

export const putAdminError = (error) => {
  return {
    type: PUT_ADMIN_ERROR,
    payload: error
  };
};

export const postAdminPending = () => {
  return {
    type: POST_ADMIN_PENDING
  };
};

export const postAdminSuccess = (data) => {
  return {
    type: POST_ADMIN_SUCCESS,
    payload: data
  };
};

export const postAdminError = (error) => {
  return {
    type: POST_ADMIN_ERROR,
    payload: error
  };
};
