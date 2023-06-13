import * as types from './constants';

export const getMembersPending = () => {
  return {
    type: types.GET_MEMBERS_PENDING
  };
};

export const getMembersSuccess = (data) => {
  return {
    type: types.GET_MEMBERS_SUCCESS,
    payload: data
  };
};

export const getMembersError = (error) => {
  return {
    type: types.GET_MEMBERS_ERROR,
    payload: error
  };
};

export const deleteMemberPending = () => {
  return {
    type: types.DELETE_MEMBER_PENDING
  };
};

export const deleteMemberSuccess = (id) => {
  return {
    type: types.DELETE_MEMBER_SUCCESS,
    payload: id
  };
};

export const deleteMemberError = (error) => {
  return {
    type: types.DELETE_MEMBER_ERROR,
    payload: error
  };
};

export const getMemberByIdPending = () => {
  return {
    type: types.GET_MEMBER_BY_ID_PENDING
  };
};

export const getMemberByIdSuccess = (data) => {
  return {
    type: types.GET_MEMBER_BY_ID_SUCCESS,
    payload: data
  };
};

export const getMemberByIdError = (error) => {
  return {
    type: types.GET_MEMBER_BY_ID_ERROR,
    payload: error
  };
};

export const updateMemberPending = () => {
  return {
    type: types.UPDATE_MEMBER_PENDING
  };
};

export const updateMemberSuccess = (id) => {
  return {
    type: types.UPDATE_MEMBER_SUCCESS,
    payload: id
  };
};

export const updateMemberError = (error) => {
  return {
    type: types.UPDATE_MEMBER_ERROR,
    payload: error
  };
};

export const addMemberPending = () => {
  return {
    type: types.ADD_MEMBER_PENDING
  };
};

export const addMemberSuccess = (member) => {
  return {
    type: types.ADD_MEMBER_SUCCESS,
    payload: member
  };
};

export const addMemberError = (error) => {
  return {
    type: types.ADD_MEMBER_ERROR,
    payload: error
  };
};
