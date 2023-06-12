import {
  GET_SUBSCRIPTIONS_PENDING,
  GET_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTIONS_ERROR,
  DELETE_SUBSCRIPTIONS_PENDING,
  DELETE_SUBSCRIPTIONS_SUCCESS,
  DELETE_SUBSCRIPTIONS_ERROR
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
