import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  GET_AUTH_PENDING,
  GET_AUTH_SUCCESS,
  GET_AUTH_ERROR
} from './constants';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthPending: true
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null
      };
    case LOGIN_ERROR:
    case LOGOUT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isLoading: false,
        error: null
      };
    case GET_AUTH_PENDING:
      return {
        ...state,
        isAuthPending: true
      };
    case GET_AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
        isAuthPending: false
      };
    case GET_AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isAuthPending: false
      };
    default:
      return state;
  }
};

export default authReducer;
