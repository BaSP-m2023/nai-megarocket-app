import { getMembersPending, getMembersSuccess, getMembersError } from './actions';

export const getMembers = () => {
  return (dispatch) => {
    dispatch(getMembersPending());
    return fetch(`${process.env.REACT_APP_API_URL}/members`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getMembersSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getMembersError(error.toString()));
      });
  };
};
