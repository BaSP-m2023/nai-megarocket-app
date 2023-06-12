import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  GET_ADMINBYID_PENDING,
  GET_ADMINBYID_SUCCESS,
  GET_ADMINBYID_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_ERROR
} from './constants';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: null
};

const adminsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ADMINS_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_ADMINS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case GET_ADMINS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_ADMINBYID_PENDING: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case GET_ADMINBYID_SUCCESS: {
      console.log('chau', action.payload);
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    }
    case GET_ADMINBYID_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case DELETE_ADMIN_PENDING: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case DELETE_ADMIN_SUCCESS: {
      const filteredData = state.data.filter((admin) => admin.id !== action.payload);
      return {
        ...state,
        loading: false,
        data: filteredData
      };
    }
    case DELETE_ADMIN_ERROR: {
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

export default adminsReducer;
