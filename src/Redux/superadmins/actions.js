import * as types from './constants';

export const getSuperAdminsPending = () => {
  return {
    type: types.GET_SUPERADMINS_PENDING
  };
};

export const getSuperAdminsSuccess = (data) => {
  return {
    type: types.GET_SUPERADMINS_SUCCESS,
    payload: data
  };
};

export const getSuperAdminsError = (error) => {
  return {
    type: types.GET_SUPERADMINS_ERROR,
    payload: error
  };
};

export const getSuperAdminsIdPending = () => {
  return {
    type: types.GET_SUPERADMINS_BY_ID_PENDING
  };
};

export const getSuperAdminsIdSuccess = (id) => {
  return {
    type: types.GET_SUPERADMINS_BY_ID_SUCCESS,
    payload: id
  };
};

export const getSuperAdminsIdError = (error) => {
  return {
    type: types.GET_SUPERADMINS_BY_ID_ERROR,
    payload: error
  };
};

export const deleteSuperAdminsPending = () => {
  return {
    type: types.DELETE_SUPERADMINS_PENDING
  };
};

export const deleteSuperAdminsSuccess = (id) => {
  return {
    type: types.DELETE_SUPERADMINS_SUCCESS,
    payload: id
  };
};

export const deleteSuperAdminsError = (error) => {
  return {
    type: types.DELETE_SUPERADMINS_ERROR,
    payload: error
  };
};

export const addSuperAdminsPending = () => {
  return {
    type: types.ADD_SUPERADMINS_PENDING
  };
};

export const addSuperAdminsSuccess = (data) => {
  return {
    type: types.ADD_SUPERADMINS_SUCCESS,
    payload: data
  };
};

export const addSuperAdminsError = (error) => {
  return {
    type: types.ADD_SUPERADMINS_ERROR,
    payload: error
  };
};

export const updateSuperAdminsPending = () => {
  return {
    type: types.UPDATE_SUPERADMINS_PENDING
  };
};

export const updateSuperAdminsSuccess = (data) => {
  return {
    type: types.UPDATE_SUPERADMINS_SUCCESS,
    payload: data
  };
};

export const updateSuperAdminsError = (error) => {
  return {
    type: types.UPDATE_SUPERADMINS_ERROR,
    payload: error
  };
};
