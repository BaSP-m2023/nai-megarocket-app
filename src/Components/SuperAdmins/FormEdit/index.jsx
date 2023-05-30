import React from 'react';
import { useState } from 'react';

const FormEdit = (props) => {
  if (!props.showEditForm) {
    return null;
  }
  const actualSuperAdmin = props.data.filter((item) => item._id === props.superAdminId);
  const [superAdmin, setSuperAdmin] = useState({
    firstName: actualSuperAdmin[0].firstName,
    email: actualSuperAdmin[0].email,
    password: actualSuperAdmin[0].password
  });

  const onChange = (e) => {
    setSuperAdmin({
      ...superAdmin,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.editSuperAdmin(props.superAdminId, superAdmin);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Namsadsae</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={superAdmin.firstName}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={superAdmin.email} onChange={onChange} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={superAdmin.password}
          onChange={onChange}
        />
      </div>
      <div>
        <input type="submit" />
      </div>
      <button onClick={props.closeEditForm}>Close</button>
    </form>
  );
};

export default FormEdit;
