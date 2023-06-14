import * as types from './constants';

export const getSubscriptionsPending = () => ({
  type: types.GET_SUBSCRIPTIONS_PENDING
});

export const getSubscriptionsSuccess = (data) => ({
  type: types.GET_SUBSCRIPTIONS_SUCCESS,
  payload: data
});

export const getSubscriptionsError = (error) => ({
  type: types.GET_SUBSCRIPTIONS_ERROR,
  payload: error
});

export const deleteSubscriptionPending = () => ({
  type: types.DELETE_SUBSCRIPTION_PENDING
});

export const deleteSubscriptionSuccess = (subscriptionId) => ({
  type: types.DELETE_SUBSCRIPTION_SUCCESS,
  payload: subscriptionId
});

export const deleteSubscriptionError = (error) => ({
  type: types.DELETE_SUBSCRIPTION_ERROR,
  payload: error
});

export const getSubscriptionByIdPending = () => ({
  type: types.GET_SUBSCRIPTION_BY_ID_PENDING
});

export const getSubscriptionByIdSuccess = (subscription) => ({
  type: types.GET_SUBSCRIPTION_BY_ID_SUCCESS,
  payload: subscription
});

export const getSubscriptionByIdError = (error) => ({
  type: types.GET_SUBSCRIPTION_BY_ID_ERROR,
  payload: error
});

export const createSubscriptionPending = () => ({
  type: types.CREATE_SUBSCRIPTION_PENDING
});

export const createSubscriptionSuccess = (subscription) => ({
  type: types.CREATE_SUBSCRIPTION_SUCCESS,
  payload: subscription
});

export const createSubscriptionError = (error) => ({
  type: types.CREATE_SUBSCRIPTION_ERROR,
  payload: error
});

export const updateSubscriptionPending = () => ({
  type: types.UPDATE_SUBSCRIPTION_PENDING
});

export const updateSubscriptionSuccess = (subscription) => ({
  type: types.UPDATE_SUBSCRIPTION_SUCCESS,
  payload: subscription
});

export const updateSubscriptionError = (error) => ({
  type: types.UPDATE_SUBSCRIPTION_ERROR,
  payload: error
});
export const getSubscriptionsByIdPending = () => ({
  type: types.GET_SUBSCRIPTIONS_BY_ID_PENDING
});

export const getSubscriptionsByIdSuccess = (id) => ({
  type: types.GET_SUBSCRIPTIONS_BY_ID_SUCCESS,
  payload: id
});

export const getSubscriptionsByIdError = (error) => ({
  type: types.GET_SUBSCRIPTIONS_BY_ID_ERROR,
  payload: error
});
