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
  updateMemberError,
  addMemberPending,
  addMemberSuccess,
  addMemberError
} from './actions';

const token = sessionStorage.getItem('token');

export const getMembers = () => {
  return async (dispatch) => {
    dispatch(getMembersPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`, {
        method: 'GET',
        headers: { token: token }
      });
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`, {
        method: 'GET',
        headers: { token: token }
      });
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
        method: 'DELETE',
        headers: { token: token }
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
          'Content-Type': 'application/json',
          token: token
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

export const addMember = (member) => {
  return async (dispatch) => {
    dispatch(addMemberPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify(member)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(addMemberSuccess({ member }));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(addMemberError(error));
      throw error;
    }
  };
};
