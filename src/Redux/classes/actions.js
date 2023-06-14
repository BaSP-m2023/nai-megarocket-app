import * as types from './constants';

export const getClassesPending = () => {
  return {
    type: types.GET_CLASSES_PENDING
  };
};

export const getClassesSuccess = (data) => {
  return {
    type: types.GET_CLASSES_SUCCESS,
    payload: data
  };
};

export const getClassesError = (error) => {
  return {
    type: types.GET_CLASSES_ERROR,
    payload: error
  };
};

export const getClassByIdPending = () => {
  return {
    type: types.GET_CLASS_BY_ID_PENDING
  };
};

export const getClassByIdSuccess = (id) => {
  return {
    type: types.GET_CLASS_BY_ID_SUCCESS,
    payload: id
  };
};

export const getClassByIdError = (error) => {
  return {
    type: types.GET_CLASS_BY_ID_ERROR,
    payload: error
  };
};

export const postClassPending = () => ({
  type: types.POST_CLASS_PENDING
});

export const postClassSuccess = (data) => ({
  type: types.POST_CLASS_SUCCESS,
  payload: data
});

export const postClassError = (error) => ({
  type: types.POST_CLASS_ERROR,
  payload: error
});

export const putClassPending = () => ({
  type: types.PUT_CLASS_PENDING
});

export const putClassSuccess = (id) => ({
  type: types.PUT_CLASS_SUCCESS,
  payload: id
});

export const putClassError = (error) => ({
  type: types.PUT_CLASS_ERROR,
  payload: error
});

export const deleteClassPending = () => {
  return {
    type: types.DELETE_CLASS_PENDING
  };
};

export const deleteClassSuccess = (id) => {
  return {
    type: types.DELETE_CLASS_SUCCESS,
    payload: id
  };
};

export const deleteClassError = (error) => {
  return {
    type: types.DELETE_CLASS_ERROR,
    payload: error
  };
};
