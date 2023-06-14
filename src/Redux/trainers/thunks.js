import {
  getTrainersPending,
  getTrainersSuccess,
  getTrainersError,
  getTrainersByIdPending,
  getTrainersByIdSuccess,
  getTrainersByIdError,
  deleteTrainersPending,
  deleteTrainerSuccess,
  deleteTrainerError,
  updateTrainerPending,
  updateTrainerSuccess,
  updateTrainerError,
  addTrainerPending,
  addTrainerSuccess,
  addTrainerError
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
      const data = await response.json();
      dispatch(deleteTrainerSuccess(trainerId));
      return data;
    } catch (error) {
      dispatch(deleteTrainerError(error.message));
      throw error;
    }
  };
};

export const updateTrainer = (id, trainer) => {
  return async (dispatch) => {
    dispatch(updateTrainerPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(trainer)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(updateTrainerSuccess({ id, trainer }));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(updateTrainerError(error));
      throw error;
    }
  };
};

export const addTrainer = (trainer) => {
  return async (dispatch) => {
    dispatch(addTrainerPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(trainer)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(addTrainerSuccess({ trainer }));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(addTrainerError(error));
      throw error;
    }
  };
};
