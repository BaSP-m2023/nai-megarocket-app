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
      dispatch(getMembersError(error.toString()));
    }
  };
};

export const deleteMember = (id) => {
  return async (dispatch) => {
    dispatch(deleteMemberPending());
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`, {
        method: 'DELETE'
      });
      dispatch(deleteMemberSuccess(id));
      return { success: true, message: 'Member deleted successfully' };
    } catch (error) {
      dispatch(deleteMemberError(error.toString()));
    }
  };
};
