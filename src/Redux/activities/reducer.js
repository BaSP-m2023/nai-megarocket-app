import {
  GET_ACTIVITIES_PENDING,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_ERROR,
  DELETE_ACTIVITIES_PENDING,
  DELETE_ACTIVITIES_SUCCESS,
  DELETE_ACTIVITIES_ERROR,
  GET_ACTIVITIES_BY_ID_PENDING,
  GET_ACTIVITIES_BY_ID_SUCCESS,
  GET_ACTIVITIES_BY_ID_ERROR,
  PUT_ACTIVITIES_PENDING,
  PUT_ACTIVITIES_SUCCESS,
  PUT_ACTIVITIES_ERROR,
  POST_ACTIVITIES_PENDING,
  POST_ACTIVITIES_SUCCESS,
  POST_ACTIVITIES_ERROR
} from './constants';

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null
};

const activitiesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ACTIVITIES_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_ACTIVITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case GET_ACTIVITIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DELETE_ACTIVITIES_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_ACTIVITIES_SUCCESS: {
      const filteredData = state.data.data?.filter(
        (activities) => activities.id !== action.payload
      );
      return {
        ...state,
        loading: false,
        data: filteredData
      };
    }
    case DELETE_ACTIVITIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_ACTIVITIES_BY_ID_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_ACTIVITIES_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case GET_ACTIVITIES_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case PUT_ACTIVITIES_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case PUT_ACTIVITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case PUT_ACTIVITIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case POST_ACTIVITIES_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case POST_ACTIVITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case POST_ACTIVITIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default activitiesReducer;
