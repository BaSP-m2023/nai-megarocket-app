import {
  GET_ACTIVITIES_PENDING,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_ERROR,
  DELETE_ACTIVITIES_PENDING,
  DELETE_ACTIVITIES_SUCCESS,
  DELETE_ACTIVITIES_ERROR
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
