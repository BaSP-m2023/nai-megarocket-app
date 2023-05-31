import React, { useState } from 'react';
// import Styles from './form.module.css';

const Form = ({ dataClasses, dataMembers }) => {
  const [users, setUsers] = useState({
    classes: '',
    member: '',
    date: new Date()
  });
  const onChangeClasses = (e) => {
    setUsers({
      ...users,
      classes: e.target.value
    });
  };

  const onChangeMember = (e) => {
    setUsers({
      ...users,
      member: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h2>Form</h2>
      <form onSubmit={onSubmit}>
        <fieldset>
          <label>Classes</label>
          <select value={users.classes} onChange={onChangeClasses}>
            <option value="">Select a class</option>
            {dataClasses?.map((classItem) => (
              <option key={classItem?._id} value={classItem?._id}>
                {classItem?.activity.name}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          <label>Members</label>
          <select value={users.member} onChange={onChangeMember}>
            <option value="">Select a member</option>
            {dataMembers?.map((memberItem) => (
              <option key={memberItem?._id} value={memberItem?._id}>
                {memberItem?.firstName}
              </option>
            ))}
          </select>
        </fieldset>
        <button type="submit">add!</button>
      </form>
    </>
  );
};

export default Form;
