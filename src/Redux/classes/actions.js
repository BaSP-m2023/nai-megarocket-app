import {
  GET_CLASSES_PENDING,
  GET_CLASSES_SUCCESS,
  GET_CLASSES_ERROR,
  DELETE_CLASS_PENDING,
  DELETE_CLASS_SUCCESS,
  DELETE_CLASS_ERROR
} from './constants';

export const getClassesPending = () => {
  return {
    type: GET_CLASSES_PENDING
  };
};

export const getClassesSuccess = (data) => {
  return {
    type: GET_CLASSES_SUCCESS,
    payload: data
  };
};

export const getClassesError = (error) => {
  return {
    type: GET_CLASSES_ERROR,
    payload: error
  };
};

export const deleteClassPending = () => {
  return {
    type: DELETE_CLASS_PENDING
  };
};

export const deleteClassSuccess = (id) => {
  return {
    type: DELETE_CLASS_SUCCESS,
    payload: id
  };
};

export const deleteClassError = (error) => {
  return {
    type: DELETE_CLASS_ERROR,
    payload: error
  };
};
