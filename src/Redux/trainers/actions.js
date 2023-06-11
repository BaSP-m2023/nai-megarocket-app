import {
  GET_TRAINERS_PENDING,
  GET_TRAINERS_SUCCESS,
  GET_TRAINERS_ERROR,
  GET_TRAINERS_BY_ID_PENDING,
  GET_TRAINERS_BY_ID_SUCCESS,
  GET_TRAINERS_BY_ID_ERROR,
  DELETE_TRAINER_PENDING,
  DELETE_TRAINER_SUCCESS,
  DELETE_TRAINER_ERROR
} from './constants';

export const getTrainersPending = () => ({
  type: GET_TRAINERS_PENDING
});

export const getTrainersSuccess = (data) => ({
  type: GET_TRAINERS_SUCCESS,
  payload: data
});

export const getTrainersError = (error) => ({
  type: GET_TRAINERS_ERROR,
  payload: error
});

export const getTrainersByIdPending = () => ({
  type: GET_TRAINERS_BY_ID_PENDING
});

export const getTrainersByIdSuccess = (data) => ({
  type: GET_TRAINERS_BY_ID_SUCCESS,
  payload: data
});

export const getTrainersByIdError = (error) => ({
  type: GET_TRAINERS_BY_ID_ERROR,
  payload: error
});

export const deleteTrainersPending = () => ({
  type: DELETE_TRAINER_PENDING
});

export const deleteTrainerSuccess = (id) => ({
  type: DELETE_TRAINER_SUCCESS,
  payload: id
});

export const deleteTrainerError = (error) => ({
  type: DELETE_TRAINER_ERROR,
  payload: error
});
