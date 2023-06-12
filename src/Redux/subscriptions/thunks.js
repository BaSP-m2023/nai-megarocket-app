import {
  getSubscriptionsPending,
  getSubscriptionsSuccess,
  getSubscriptionsError,
  deleteSubscriptionsPending,
  deleteSubscriptionsSuccess,
  deleteSubscriptionsError,
  getSubscriptionsByIdPending,
  getSubscriptionsByIdSuccess,
  getSubscriptionsByIdError
} from './actions';

export const getSubscriptions = () => {
  return async (dispatch) => {
    dispatch(getSubscriptionsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions`);
      const data = await response.json();
      dispatch(getSubscriptionsSuccess(data));
      return data;
    } catch (error) {
      dispatch(getSubscriptionsError);
    }
  };
};

export const getSubscriptionById = (id) => {
  return async (dispatch) => {
    dispatch(getSubscriptionsByIdPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
        method: 'GET'
      });
      const { data } = await response.json();
      dispatch(getSubscriptionsByIdSuccess(data));
      return data;
    } catch (error) {
      dispatch(getSubscriptionsByIdError(error));
      throw error;
    }
  };
};

export const deleteSubscription = (id) => {
  return async (dispatch) => {
    dispatch(deleteSubscriptionsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(deleteSubscriptionsSuccess(id));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(deleteSubscriptionsError(error));
      throw error;
    }
  };
};
