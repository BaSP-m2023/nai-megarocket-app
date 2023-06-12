import { GET_CLASSES_PENDING, GET_CLASSES_SUCCESS, GET_CLASSES_ERROR } from './constants';

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null
};

const classesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CLASSES_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_CLASSES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case GET_CLASSES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default classesReducer;
