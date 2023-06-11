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

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: null
};

const trainersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TRAINERS_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_TRAINERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case GET_TRAINERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_TRAINERS_BY_ID_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_TRAINERS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case GET_TRAINERS_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DELETE_TRAINER_PENDING: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case DELETE_TRAINER_SUCCESS: {
      const filteredData = state.data.filter((trainer) => trainer.id !== action.payload);
      return {
        ...state,
        loading: false,
        data: filteredData
      };
    }
    case DELETE_TRAINER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
};

export default trainersReducer;
