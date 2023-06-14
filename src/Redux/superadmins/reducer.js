import * as types from './constants';

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null
};

const superAdminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_SUPERADMINS_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.GET_SUPERADMINS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case types.GET_SUPERADMINS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.GET_SUPERADMINS_BY_ID_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.GET_SUPERADMINS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case types.GET_SUPERADMINS_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.DELETE_SUPERADMINS_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.DELETE_SUPERADMINS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...state.data,
          data: state.data.data.filter((superAdmin) => superAdmin._id !== action.payload)
        }
      };
    case types.DELETE_SUPERADMINS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.ADD_SUPERADMINS_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.ADD_SUPERADMINS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case types.ADD_SUPERADMINS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.UPDATE_SUPERADMINS_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.UPDATE_SUPERADMINS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case types.UPDATE_SUPERADMINS_ERROR:
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
