import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  GET_AUTH_PENDING,
  GET_AUTH_SUCCESS,
  GET_AUTH_ERROR,
  SET_USER_ROLE,
  UPDATE_USER,
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
} from './constants';

const initialState = {
  userClaims: null,
  user: null,
  isLoading: false,
  error: null,
  isAuthPending: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
    case LOGOUT_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        userClaims: action.payload,
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
        userClaims: null,
        user: null,
        role: null,
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
        user: {
          ...action.payload
        },
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
    case SET_USER_ROLE:
      return {
        ...state,
        role: action.payload
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload
      };
    case SIGN_UP_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
