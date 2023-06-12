import {
  GET_SUBSCRIPTIONS_PENDING,
  GET_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTIONS_ERROR,
  DELETE_SUBSCRIPTIONS_PENDING,
  DELETE_SUBSCRIPTIONS_SUCCESS,
  DELETE_SUBSCRIPTIONS_ERROR
} from './constants';

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null
};

const subscriptionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUBSCRIPTIONS_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: false
      };
    case GET_SUBSCRIPTIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DELETE_SUBSCRIPTIONS_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_SUBSCRIPTIONS_SUCCESS: {
      const filteredData = state.data.data?.filter(
        (subscriptions) => subscriptions.id !== action.payload
      );
      return {
        ...state,
        loading: false,
        data: filteredData,
        error: false
      };
    }
    case DELETE_SUBSCRIPTIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
export default subscriptionsReducer;
