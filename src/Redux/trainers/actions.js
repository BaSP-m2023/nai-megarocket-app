import * as types from './constants';

export const getTrainersPending = () => {
  return {
    type: types.GET_TRAINERS_PENDING
  };
};

export const getTrainersSuccess = (data) => {
  return {
    type: types.GET_TRAINERS_SUCCESS,
    payload: data
  };
};

export const getTrainersError = (error) => {
  return {
    type: types.GET_TRAINERS_ERROR,
    payload: error
  };
};

export const getTrainersByIdPending = () => {
  return {
    type: types.GET_TRAINERS_BY_ID_PENDING
  };
};

export const getTrainersByIdSuccess = (data) => {
  return {
    type: types.GET_TRAINERS_BY_ID_SUCCESS,
    payload: data
  };
};

export const getTrainersByIdError = (error) => {
  return {
    type: types.GET_TRAINERS_BY_ID_ERROR,
    payload: error
  };
};

export const deleteTrainersPending = () => {
  return {
    type: types.DELETE_TRAINER_PENDING
  };
};

export const deleteTrainerSuccess = (id) => {
  return {
    type: types.DELETE_TRAINER_SUCCESS,
    payload: id
  };
};

export const deleteTrainerError = (error) => {
  return {
    type: types.DELETE_TRAINER_ERROR,
    payload: error
  };
};

export const updateTrainerPending = () => {
  return {
    type: types.UPDATE_TRAINER_PENDING
  };
};

export const updateTrainerSuccess = (id) => {
  return {
    type: types.UPDATE_TRAINER_SUCCESS,
    payload: id
  };
};

export const updateTrainerError = (error) => {
  return {
    type: types.UPDATE_TRAINER_ERROR,
    payload: error
  };
};

export const addTrainerPending = () => {
  return {
    type: types.ADD_TRAINER_PENDING
  };
};

export const addTrainerSuccess = (trainer) => {
  return {
    type: types.ADD_TRAINER_SUCCESS,
    payload: trainer
  };
};

export const addTrainerError = (error) => {
  return {
    type: types.ADD_TRAINER_ERROR,
    payload: error
  };
};
