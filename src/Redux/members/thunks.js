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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`);
      const data = await response.json();
      dispatch(getMembersSuccess(data));
      return data;
    } catch (error) {
      dispatch(getMembersError(error));
    }
  };
};

export const deleteMember = (id) => {
  return async (dispatch) => {
    dispatch(deleteMemberPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(deleteMemberSuccess(id));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(deleteMemberError(error));
      throw error;
    }
  };
};
