function SelectedMemberInfo({ selectedMember }) {
  return (
    <div>
      <h3>Detailed information of the selected member:</h3>
      <p>Name: {selectedMember.firstName}</p>
      <p>Surname: {selectedMember.lastName}</p>
      <p>Dni: {selectedMember.dni}</p>
      <p>Email: {selectedMember.email}</p>
      <p>Password: {selectedMember.password}</p>
      <p>City: {selectedMember.city}</p>
      <p>
        Birthday:{' '}
        {new Date(selectedMember.birthDay).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC'
        })}
      </p>
      <p>PostalCode: {selectedMember.postalCode}</p>
      <p>Membership: {selectedMember.membership}</p>
    </div>
  );
}

export default SelectedMemberInfo;
