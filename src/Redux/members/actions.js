import {
  GET_MEMBERS_PENDING,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_ERROR,
  DELETE_MEMBER_PENDING,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_ERROR
} from './constants';

export const getMembersPending = () => {
  return {
    type: GET_MEMBERS_PENDING
  };
};

export const getMembersSuccess = (data) => {
  return {
    type: GET_MEMBERS_SUCCESS,
    payload: data
  };
};

export const getMembersError = (error) => {
  return {
    type: GET_MEMBERS_ERROR,
    payload: error
  };
};

export const deleteMemberPending = () => {
  return {
    type: DELETE_MEMBER_PENDING
  };
};

export const deleteMemberSuccess = (id) => {
  return {
    type: DELETE_MEMBER_SUCCESS,
    payload: id
  };
};

export const deleteMemberError = (error) => {
  return {
    type: DELETE_MEMBER_ERROR,
    payload: error
  };
};
