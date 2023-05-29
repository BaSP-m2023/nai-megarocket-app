export async function fetchMembers() {
  try {
    const response = await fetch('http://localhost:4000/api/members');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteMember(id) {
  try {
    const response = await fetch(`http://localhost:4000/api/members/${id}`, {
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
