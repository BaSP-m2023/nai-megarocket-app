import {
  getTrainersPending,
  getTrainersSuccess,
  getTrainersError,
  getTrainersByIdPending,
  getTrainersByIdSuccess,
  getTrainersByIdError,
  deleteTrainersPending,
  deleteTrainerSuccess,
  deleteTrainerError
} from './actions';

export const getTrainers = () => {
  return async (dispatch) => {
    dispatch(getTrainersPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers`);
      const data = await response.json();
      dispatch(getTrainersSuccess(data.data));
    } catch (error) {
      dispatch(getTrainersError(error));
    }
  };
};

export const getTrainersById = (id) => {
  return async (dispatch) => {
    dispatch(getTrainersByIdPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/${id}`, {
        method: 'GET'
      });
      const data = await response.json();
      dispatch(getTrainersByIdSuccess(data.data));
      return data;
    } catch (error) {
      dispatch(getTrainersByIdError(error));
    }
  };
};

export const deleteTrainer = (trainerId) => {
  return async (dispatch) => {
    dispatch(deleteTrainersPending());

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/${trainerId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete trainer');
      }

      dispatch(deleteTrainerSuccess(trainerId));
    } catch (error) {
      dispatch(deleteTrainerError(error.message));
      throw error;
    }
  };
};
