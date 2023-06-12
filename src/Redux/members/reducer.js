import {
  GET_MEMBERS_PENDING,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_ERROR,
  DELETE_MEMBER_SUCCESS,
  GET_MEMBER_BY_ID_PENDING,
  GET_MEMBER_BY_ID_SUCCESS,
  GET_MEMBER_BY_ID_ERROR,
  UPDATE_MEMBER_SUCCESS,
  ADD_MEMBER_PENDING,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_ERROR
} from './constants';

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null
};

const membersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MEMBERS_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_MEMBERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case GET_MEMBERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_MEMBER_BY_ID_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_MEMBER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case GET_MEMBER_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DELETE_MEMBER_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          data: state.data.data.filter((member) => member._id !== action.payload)
        }
      };
    case UPDATE_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case ADD_MEMBER_PENDING:
      return {
        ...state,
        isAddingMember: true,
        addMemberError: null
      };
    case ADD_MEMBER_SUCCESS:
      return {
        ...state,
        isAddingMember: false,
        data: [...state.data.data, action.payload.member],
        addMemberError: null
      };
    case ADD_MEMBER_ERROR:
      return {
        ...state,
        isAddingMember: false,
        addMemberError: action.payload
      };
    default:
      return state;
  }
};

export default membersReducer;
