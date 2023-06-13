import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  DELETE_SUPERADMINS_PENDING,
  DELETE_SUPERADMINS_SUCCESS,
  DELETE_SUPERADMINS_ERROR,
  GET_SUPERADMINS_BY_ID_PENDING,
  GET_SUPERADMINS_BY_ID_SUCCESS,
  GET_SUPERADMINS_BY_ID_ERROR,
  ADD_SUPERADMINS_PENDING,
  ADD_SUPERADMINS_SUCCESS,
  ADD_SUPERADMINS_ERROR,
  UPDATE_SUPERADMINS_PENDING,
  UPDATE_SUPERADMINS_SUCCESS,
  UPDATE_SUPERADMINS_ERROR
} from './constants';

export const getSuperAdminsPending = () => {
  return {
    type: GET_SUPERADMINS_PENDING
  };
};

export const getSuperAdminsSuccess = (data) => {
  return {
    type: GET_SUPERADMINS_SUCCESS,
    payload: data
  };
};

export const getSuperAdminsError = (error) => {
  return {
    type: GET_SUPERADMINS_ERROR,
    payload: error
  };
};

export const getSuperAdminsIdPending = () => {
  return {
    type: GET_SUPERADMINS_BY_ID_PENDING
  };
};

export const getSuperAdminsIdSuccess = (id) => {
  return {
    type: GET_SUPERADMINS_BY_ID_SUCCESS,
    payload: id
  };
};

export const getSuperAdminsIdError = (error) => {
  return {
    type: GET_SUPERADMINS_BY_ID_ERROR,
    payload: error
  };
};

export const deleteSuperAdminsPending = () => {
  return {
    type: DELETE_SUPERADMINS_PENDING
  };
};

export const deleteSuperAdminsSuccess = (id) => {
  return {
    type: DELETE_SUPERADMINS_SUCCESS,
    payload: id
  };
};

export const deleteSuperAdminsError = (error) => {
  return {
    type: DELETE_SUPERADMINS_ERROR,
    payload: error
  };
};

export const addSuperAdminsPending = () => {
  return {
    type: ADD_SUPERADMINS_PENDING
  };
};

export const addSuperAdminsSuccess = (data) => {
  return {
    type: ADD_SUPERADMINS_SUCCESS,
    payload: data
  };
};

export const addSuperAdminsError = (error) => {
  return {
    type: ADD_SUPERADMINS_ERROR,
    payload: error
  };
};

export const updateSuperAdminsPending = () => {
  return {
    type: UPDATE_SUPERADMINS_PENDING
  };
};

export const updateSuperAdminsSuccess = (data) => {
  return {
    type: UPDATE_SUPERADMINS_SUCCESS,
    payload: data
  };
};

export const updateSuperAdminsError = (error) => {
  return {
    type: UPDATE_SUPERADMINS_ERROR,
    payload: error
  };
};
