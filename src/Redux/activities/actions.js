import {
  GET_ACTIVITIES_PENDING,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_ERROR,
  DELETE_ACTIVITIES_PENDING,
  DELETE_ACTIVITIES_SUCCESS,
  DELETE_ACTIVITIES_ERROR,
  GET_ACTIVITIES_BY_ID_PENDING,
  GET_ACTIVITIES_BY_ID_SUCCESS,
  GET_ACTIVITIES_BY_ID_ERROR,
  PUT_ACTIVITIES_PENDING,
  PUT_ACTIVITIES_SUCCESS,
  PUT_ACTIVITIES_ERROR,
  POST_ACTIVITIES_PENDING,
  POST_ACTIVITIES_SUCCESS,
  POST_ACTIVITIES_ERROR
} from './constants';

export const getActivitiesPending = () => {
  return {
    type: GET_ACTIVITIES_PENDING
  };
};

export const getActivitiesSuccess = (data) => {
  return {
    type: GET_ACTIVITIES_SUCCESS,
    payload: data
  };
};

export const getActivitiesError = (error) => {
  return {
    type: GET_ACTIVITIES_ERROR,
    payload: error
  };
};

export const deleteActivitiesPending = () => {
  return {
    type: DELETE_ACTIVITIES_PENDING
  };
};

export const deleteActivitiesSuccess = (id) => {
  return {
    type: DELETE_ACTIVITIES_SUCCESS,
    payload: id
  };
};

export const deleteActivitiesError = (error) => {
  return {
    type: DELETE_ACTIVITIES_ERROR,
    payload: error
  };
};

export const getActivitiesByIdPending = () => {
  return {
    type: GET_ACTIVITIES_BY_ID_PENDING
  };
};

export const getActivitiesByIdSuccess = (id) => {
  return {
    type: GET_ACTIVITIES_BY_ID_SUCCESS,
    payload: id
  };
};

export const getActivitiesByIdError = (error) => {
  return {
    type: GET_ACTIVITIES_BY_ID_ERROR,
    payload: error
  };
};

export const putActivitiesPending = () => {
  return {
    type: PUT_ACTIVITIES_PENDING
  };
};

export const putActivitiesSuccess = (data) => {
  return {
    type: PUT_ACTIVITIES_SUCCESS,
    payload: data
  };
};

export const putActivitiesError = (error) => {
  return {
    type: PUT_ACTIVITIES_ERROR,
    payload: error
  };
};

export const postActivitiesPending = () => {
  return {
    type: POST_ACTIVITIES_PENDING
  };
};

export const postActivitiesSuccess = (data) => {
  return {
    type: POST_ACTIVITIES_SUCCESS,
    payload: data
  };
};

export const postActivitiesError = (error) => {
  return {
    type: POST_ACTIVITIES_ERROR,
    payload: error
  };
};
