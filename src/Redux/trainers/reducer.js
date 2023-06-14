import * as types from './constants';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: null
};

const trainersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_TRAINERS_PENDING:
      return {
        ...state,
        loading: true
      };
    case types.GET_TRAINERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case types.GET_TRAINERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.GET_TRAINERS_BY_ID_PENDING:
      return {
        ...state,
        loading: true
      };
    case types.GET_TRAINERS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case types.GET_TRAINERS_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.DELETE_TRAINER_PENDING: {
      return {
        ...state,
        loading: true
      };
    }
    case types.DELETE_TRAINER_SUCCESS: {
      const filteredData = state.data.filter((trainer) => trainer.id !== action.payload);
      return {
        ...state,
        loading: false,
        data: filteredData
      };
    }
    case types.DELETE_TRAINER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case types.UPDATE_TRAINER_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.UPDATE_TRAINER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case types.UPDATE_TRAINER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.ADD_TRAINER_PENDING:
      return {
        ...state,
        loading: true
      };
    case types.ADD_TRAINER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload.trainer]
      };
    case types.ADD_TRAINER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default trainersReducer;
