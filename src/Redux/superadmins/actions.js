import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  DELETE_SUPERADMINS_PENDING,
  DELETE_SUPERADMINS_SUCCESS,
  DELETE_SUPERADMINS_ERROR,
  GET_SUPERADMINSID_PENDING,
  GET_SUPERADMINSID_SUCCESS,
  GET_SUPERADMINSID_ERROR
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
    type: GET_SUPERADMINSID_PENDING
  };
};

export const getSuperAdminsIdSuccess = (id) => {
  return {
    type: GET_SUPERADMINSID_SUCCESS,
    payload: id
  };
};

export const getSuperAdminsIdError = (error) => {
  return {
    type: GET_SUPERADMINSID_ERROR,
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
