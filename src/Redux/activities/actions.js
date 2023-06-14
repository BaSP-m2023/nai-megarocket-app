import * as types from './constants';

export const getActivitiesPending = () => {
  return {
    type: types.GET_ACTIVITIES_PENDING
  };
};

export const getActivitiesSuccess = (data) => {
  return {
    type: types.GET_ACTIVITIES_SUCCESS,
    payload: data
  };
};

export const getActivitiesError = (error) => {
  return {
    type: types.GET_ACTIVITIES_ERROR,
    payload: error
  };
};

export const deleteActivitiesPending = () => {
  return {
    type: types.DELETE_ACTIVITIES_PENDING
  };
};

export const deleteActivitiesSuccess = (id) => {
  return {
    type: types.DELETE_ACTIVITIES_SUCCESS,
    payload: id
  };
};

export const deleteActivitiesError = (error) => {
  return {
    type: types.DELETE_ACTIVITIES_ERROR,
    payload: error
  };
};

export const getActivitiesByIdPending = () => {
  return {
    type: types.GET_ACTIVITIES_BY_ID_PENDING
  };
};

export const getActivitiesByIdSuccess = (id) => {
  return {
    type: types.GET_ACTIVITIES_BY_ID_SUCCESS,
    payload: id
  };
};

export const getActivitiesByIdError = (error) => {
  return {
    type: types.GET_ACTIVITIES_BY_ID_ERROR,
    payload: error
  };
};

export const putActivitiesPending = () => {
  return {
    type: types.PUT_ACTIVITIES_PENDING
  };
};

export const putActivitiesSuccess = (data) => {
  return {
    type: types.PUT_ACTIVITIES_SUCCESS,
    payload: data
  };
};

export const putActivitiesError = (error) => {
  return {
    type: types.PUT_ACTIVITIES_ERROR,
    payload: error
  };
};

export const postActivitiesPending = () => {
  return {
    type: types.POST_ACTIVITIES_PENDING
  };
};

export const postActivitiesSuccess = (data) => {
  return {
    type: types.POST_ACTIVITIES_SUCCESS,
    payload: data
  };
};

export const postActivitiesError = (error) => {
  return {
    type: types.POST_ACTIVITIES_ERROR,
    payload: error
  };
};
