import * as types from './constants';

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null
};

const classesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_CLASSES_PENDING:
    case types.GET_CLASS_BY_ID_PENDING:
      return {
        ...state,
        loading: true
      };
    case types.GET_CLASSES_SUCCESS:
    case types.GET_CLASS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case types.GET_CLASSES_ERROR:
    case types.GET_CLASS_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.DELETE_CLASS_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          data: state.data.data.filter((gymClass) => gymClass._id !== action.payload)
        }
      };
    case types.PUT_CLASS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case types.POST_CLASS_PENDING:
      return {
        ...state,
        loading: true
      };
    case types.POST_CLASS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case types.POST_CLASS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default classesReducer;
