import { GET_MEMBERS_PENDING, GET_MEMBERS_SUCCESS, GET_MEMBERS_ERROR } from './constants';

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
    default:
      return state;
  }
};

export default membersReducer;