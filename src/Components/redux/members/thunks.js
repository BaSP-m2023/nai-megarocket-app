import {
  getMembersPending,
  getMembersSuccess,
  getMembersError,
  deleteMemberPending,
  deleteMemberSuccess,
  deleteMemberError
} from './actions';

export const getMembers = () => {
  return async (dispatch) => {
    dispatch(getMembersPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/members`);
      const data = await response.json();
      dispatch(getMembersSuccess(data));
      return data;
    } catch (error) {
      dispatch(getMembersError(error.toString()));
    }
  };
};

export const deleteMember = (id) => {
  return async (dispatch) => {
    dispatch(deleteMemberPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/members/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('An error occurred while trying to delete the member');
      }

      dispatch(deleteMemberSuccess(id));
    } catch (error) {
      dispatch(deleteMemberError(error.toString()));
    }
  };
};
