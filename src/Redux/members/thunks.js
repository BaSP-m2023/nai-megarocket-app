import {
  getMembersPending,
  getMembersSuccess,
  getMembersError,
  deleteMemberPending,
  deleteMemberSuccess,
  deleteMemberError,
  getMemberByIdPending,
  getMemberByIdSuccess,
  getMemberByIdError,
  updateMemberPending,
  updateMemberSuccess,
  updateMemberError
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

export const getMembersById = (id) => {
  return async (dispatch) => {
    dispatch(getMemberByIdPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`);
      const data = await response.json();
      dispatch(getMemberByIdSuccess(data));
      return data;
    } catch (error) {
      dispatch(getMemberByIdError(error));
      throw error;
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

export const updateMember = (id, member) => {
  return async (dispatch) => {
    dispatch(updateMemberPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(member)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(updateMemberSuccess({ id, member }));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(updateMemberError(error));
      throw error;
    }
  };
};
