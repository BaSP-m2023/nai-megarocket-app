import {
  getSubscriptionsPending,
  getSubscriptionsSuccess,
  getSubscriptionsError,
  deleteSubscriptionPending,
  deleteSubscriptionSuccess,
  deleteSubscriptionError,
  getSubscriptionByIdPending,
  getSubscriptionByIdSuccess,
  getSubscriptionByIdError,
  createSubscriptionPending,
  createSubscriptionSuccess,
  createSubscriptionError,
  updateSubscriptionPending,
  updateSubscriptionSuccess,
  updateSubscriptionError
} from './actions';

export const getSubscriptions = () => async (dispatch) => {
  dispatch(getSubscriptionsPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch subscriptions');
    }
    const { data } = await response.json();
    dispatch(getSubscriptionsSuccess(data));
    return data;
  } catch (error) {
    dispatch(getSubscriptionsError);
  }
};

export const deleteSubscription = (subscriptionId) => async (dispatch) => {
  dispatch(deleteSubscriptionPending());
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/subscriptions/${subscriptionId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('token')
        }
      }
    );
    if (!response.ok) {
      throw new Error('Failed to delete subscription');
    }
    const data = await response.json();
    dispatch(deleteSubscriptionSuccess(subscriptionId));
    return data;
  } catch (error) {
    dispatch(deleteSubscriptionError(error.message));
    throw error;
  }
};

export const getSubscriptionById = (subscriptionId) => async (dispatch) => {
  dispatch(getSubscriptionByIdPending());
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/subscriptions/${subscriptionId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('token')
        }
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch subscription');
    }
    const data = await response.json();
    dispatch(getSubscriptionByIdSuccess(data));
    return data;
  } catch (error) {
    dispatch(getSubscriptionByIdError(error.message));
  }
};

export const createSubscription = (subscription) => async (dispatch) => {
  dispatch(createSubscriptionPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage.getItem('token')
      },
      body: JSON.stringify(subscription)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    dispatch(createSubscriptionSuccess(data.data));
    return data;
  } catch (error) {
    dispatch(createSubscriptionError(error));
    throw error;
  }
};

export const updateSubscription = (subscription, subscriptionId) => async (dispatch) => {
  dispatch(updateSubscriptionPending());
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/subscriptions/${subscriptionId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('token')
        },
        body: JSON.stringify(subscription)
      }
    );
    const data = await response.json();
    if (response.ok) {
      dispatch(updateSubscriptionSuccess(data.data));
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch(updateSubscriptionError(error));
    throw error;
  }
};
