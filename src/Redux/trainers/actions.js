import {
  GET_TRAINERS_PENDING,
  GET_TRAINERS_SUCCESS,
  GET_TRAINERS_ERROR,
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
