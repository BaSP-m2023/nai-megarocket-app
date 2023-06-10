import { GET_ACTIVITIES_PENDING, GET_ACTIVITIES_SUCCESS, GET_ACTIVITIES_ERROR } from './constants';

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null
};

const membersReducer = (state = INITIAL_STATE, action) => {
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
    default:
      return state;
  }
};

export default membersReducer;
