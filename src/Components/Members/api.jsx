async function fetchMembers() {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteMember(id) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('An error occurred while trying to delete the member');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function updateMember(member) {
  try {
    const memberWithoutId = { ...member };
    delete memberWithoutId._id;
    delete memberWithoutId.__v;

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${member._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(memberWithoutId)
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(errorMessage);
      throw new Error(`An error occurred while trying to update the member: ${errorMessage}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createMember(member) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(member)
    });
    if (response.ok) {
      const newMember = await response.json();
      return newMember.data;
    } else {
      throw new Error('An error occurred while trying to add the member');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export default {
  fetchMembers,
  deleteMember,
  updateMember,
  createMember
};
