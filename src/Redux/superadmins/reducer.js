import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  GET_SUPERADMINSID_PENDING,
  GET_SUPERADMINSID_SUCCESS,
  GET_SUPERADMINSID_ERROR,
  DELETE_SUPERADMINS_PENDING,
  DELETE_SUPERADMINS_SUCCESS,
  DELETE_SUPERADMINS_ERROR
} from './constants';

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null
};

const superAdminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUPERADMINS_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_SUPERADMINS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case GET_SUPERADMINS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_SUPERADMINSID_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_SUPERADMINSID_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case GET_SUPERADMINSID_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DELETE_SUPERADMINS_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_SUPERADMINS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case DELETE_SUPERADMINS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default superAdminReducer;
