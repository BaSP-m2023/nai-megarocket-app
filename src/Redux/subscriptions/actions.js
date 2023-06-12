import {
  GET_SUBSCRIPTIONS_PENDING,
  GET_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTIONS_ERROR,
  DELETE_SUBSCRIPTIONS_PENDING,
  DELETE_SUBSCRIPTIONS_SUCCESS,
  DELETE_SUBSCRIPTIONS_ERROR,
  GET_SUBSCRIPTIONS_BY_ID_PENDING,
  GET_SUBSCRIPTIONS_BY_ID_SUCCESS,
  GET_SUBSCRIPTIONS_BY_ID_ERROR
} from './constants';

export const getSubscriptionsPending = () => ({
  type: GET_SUBSCRIPTIONS_PENDING
});

export const getSubscriptionsSuccess = (data) => ({
  type: GET_SUBSCRIPTIONS_SUCCESS,
  payload: data
});

export const getSubscriptionsError = (error) => ({
  type: GET_SUBSCRIPTIONS_ERROR,
  payload: error
});

export const deleteSubscriptionsPending = () => ({
  type: DELETE_SUBSCRIPTIONS_PENDING
});

export const deleteSubscriptionsSuccess = (id) => ({
  type: DELETE_SUBSCRIPTIONS_SUCCESS,
  payload: id
});

export const deleteSubscriptionsError = (error) => ({
  type: DELETE_SUBSCRIPTIONS_ERROR,
  payload: error
});

export const getSubscriptionsByIdPending = () => ({
  type: GET_SUBSCRIPTIONS_BY_ID_PENDING
});

export const getSubscriptionsByIdSuccess = (id) => ({
  type: GET_SUBSCRIPTIONS_BY_ID_SUCCESS,
  payload: id
});

export const getSubscriptionsByIdError = (error) => ({
  type: GET_SUBSCRIPTIONS_BY_ID_ERROR,
  payload: error
});
