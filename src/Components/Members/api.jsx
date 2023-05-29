export async function fetchMembers() {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/members`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteMember(id) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/members/${id}`, {
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
