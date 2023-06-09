import * as types from './constants';

const INITIAL_STATE = {
  loading: false,
  error: null,
  data: []
};

const subscriptionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_SUBSCRIPTIONS_PENDING:
    case types.DELETE_SUBSCRIPTION_PENDING:
    case types.GET_SUBSCRIPTION_BY_ID_PENDING:
    case types.CREATE_SUBSCRIPTION_PENDING:
    case types.UPDATE_SUBSCRIPTION_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.GET_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case types.GET_SUBSCRIPTIONS_ERROR:
    case types.DELETE_SUBSCRIPTION_ERROR:
    case types.GET_SUBSCRIPTION_BY_ID_ERROR:
    case types.CREATE_SUBSCRIPTION_ERROR:
    case types.UPDATE_SUBSCRIPTION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.DELETE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.filter((subscription) => subscription._id !== action.payload)
      };
    case types.GET_SUBSCRIPTION_BY_ID_SUCCESS:
    case types.CREATE_SUBSCRIPTION_SUCCESS: {
      const { classes, member, ...rest } = action.payload;
      const populatedClasses = { _id: classes };
      const populatedMember = { _id: member };
      return {
        ...state,
        loading: false,
        data: [...state.data, { classes: populatedClasses, member: populatedMember, ...rest }]
      };
    }
    case types.UPDATE_SUBSCRIPTION_SUCCESS: {
      const updatedData = state.data.map((item) => {
        if (item._id === action.payload._id) {
          return {
            ...item,
            isActive: action.payload.isActive
          };
        }
        return item;
      });

      return {
        ...state,
        loading: false,
        data: updatedData
      };
    }

    default:
      return state;
  }
};

export default subscriptionsReducer;
