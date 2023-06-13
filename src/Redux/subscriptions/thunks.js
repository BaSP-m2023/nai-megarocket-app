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
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions`);
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
        method: 'DELETE'
      }
    );
    if (!response.ok) {
      throw new Error('Failed to delete subscription');
    }
    const data = await response.json();
    dispatch(deleteSubscriptionSuccess(subscriptionId));
    return data;
  } catch (error) {
    dispatch(deleteSubscriptionError(error.msg));
    throw error;
  }
};

export const getSubscriptionById = (subscriptionId) => async (dispatch) => {
  dispatch(getSubscriptionByIdPending());
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/subscriptions/${subscriptionId}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch subscription');
    }
    const data = await response.json();
    dispatch(getSubscriptionByIdSuccess(data));
  } catch (error) {
    dispatch(getSubscriptionByIdError(error.msg));
  }
};

export const createSubscription = (subscription) => async (dispatch) => {
  dispatch(createSubscriptionPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscription)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.msg);
    }
    dispatch(createSubscriptionSuccess(data));
    return data;
  } catch (error) {
    dispatch(createSubscriptionError(error.message));
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
      }
    );
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(data.msg);
    }
    dispatch(updateSubscriptionSuccess(data));
    return data;
  } catch (error) {
    dispatch(updateSubscriptionError(error.msg));
    throw error;
  }
};
