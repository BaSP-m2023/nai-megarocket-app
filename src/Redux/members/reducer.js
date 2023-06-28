import * as types from './constants';

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null
};

const membersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_MEMBERS_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.GET_MEMBERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case types.GET_MEMBERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.GET_MEMBER_BY_ID_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.GET_MEMBER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case types.GET_MEMBER_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.DELETE_MEMBER_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.DELETE_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          data: state.data.data.filter((member) => member._id !== action.payload)
        }
      };
    case types.DELETE_MEMBER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.UPDATE_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case types.ADD_MEMBER_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.ADD_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case types.ADD_MEMBER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default membersReducer;
