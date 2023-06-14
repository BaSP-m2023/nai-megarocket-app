import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  GET_ADMIN_BY_ID_PENDING,
  GET_ADMIN_BY_ID_SUCCESS,
  GET_ADMIN_BY_ID_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_ERROR,
  PUT_ADMIN_PENDING,
  PUT_ADMIN_SUCCESS,
  PUT_ADMIN_ERROR,
  POST_ADMIN_PENDING,
  POST_ADMIN_SUCCESS,
  POST_ADMIN_ERROR
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
    case GET_ADMIN_BY_ID_PENDING: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case GET_ADMIN_BY_ID_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    }
    case GET_ADMIN_BY_ID_ERROR: {
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
      const filteredData = state.data.filter((admin) => admin._id !== action.payload);
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
    case PUT_ADMIN_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case PUT_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case PUT_ADMIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case POST_ADMIN_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case POST_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case POST_ADMIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    // case POST_ADMIN_SUCCESS:
    //   return {
    //     ...state,
    //     isAddingMember: false,
    //     data: [...state.data.data, action.payload.member],
    //     addMemberError: null
    //   };
    default:
      return state;
  }
};

export default adminsReducer;
