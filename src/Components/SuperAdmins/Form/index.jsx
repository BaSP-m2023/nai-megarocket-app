import React from 'react';
import { useState } from 'react';

const Form = (props) => {
  if (!props.showCreateForm) {
    return null;
  }
  const [superAdmin, setSuperAdmin] = useState({
    firstName: '',
    email: '',
    password: ''
  });

  const onChange = (e) => {
    setSuperAdmin({
      ...superAdmin,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitPost = (e) => {
    e.preventDefault();
    props.addSuperAdmin(superAdmin);
  };

  return (
    <form onSubmit={onSubmitPost}>
      <div>
        <label htmlFor="name">Name</label>
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
      <button onClick={props.closeCreateForm}>Close</button>
    </form>
  );
};

export default Form;
