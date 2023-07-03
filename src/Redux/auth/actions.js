import {
  GET_AUTH_PENDING,
  GET_AUTH_SUCCESS,
  GET_AUTH_ERROR,
  LOGIN_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  SET_USER_ROLE,
  UPDATE_USER
} from './constants';

export const getAuthPending = () => {
  return {
    type: GET_AUTH_PENDING
  };
};

export const getAuthSuccess = (data) => {
  return {
    type: GET_AUTH_SUCCESS,
    payload: data
  };
};

export const getAuthError = (error) => {
  return {
    type: GET_AUTH_ERROR,
    payload: error
  };
};
export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error
  };
};

export const logoutPending = () => {
  return {
    type: LOGOUT_PENDING
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const logoutError = (error) => {
  return {
    type: LOGOUT_ERROR,
    payload: error
  };
};

export const setUserRole = (role) => {
  return {
    type: SET_USER_ROLE,
    payload: role
  };
};

export const updateUser = (data) => {
  return {
    type: UPDATE_USER,
    payload: data
  };
};
