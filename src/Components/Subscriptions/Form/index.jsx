import React, { useState, useEffect } from 'react';

const Form = ({
  dataClasses,
  dataMembers,
  addSubscription,
  selectedSubscription,
  updateSubscription,
  method,
  showForm
}) => {
  if (!showForm) {
    return null;
  }
  const [users, setUsers] = useState({
    classes: '',
    member: '',
    date: new Date()
  });

  const onChangeClasses = (e) => {
    setUsers((prevState) => ({
      ...prevState,
      classes: e.target.value
    }));
  };

  const onChangeMember = (e) => {
    setUsers((prevState) => ({
      ...prevState,
      member: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (selectedSubscription) {
      updateSubscription(users);
    } else {
      const newSubscription = {
        classes: users.classes,
        member: users.member,
        date: users.date
      };

      addSubscription(newSubscription);
    }

    setUsers({
      classes: '',
      member: '',
      date: new Date()
    });
  };

  useEffect(() => {
    if (method === 'PUT' && selectedSubscription) {
      setUsers({
        classes: selectedSubscription.classes?._id || '',
        member: selectedSubscription.member?._id || '',
        date: selectedSubscription.date || new Date()
      });
    } else {
      setUsers({
        classes: '',
        member: '',
        date: new Date()
      });
    }
  }, [method, selectedSubscription]);

  return (
    <>
      <h2>Form</h2>
      <form onSubmit={onSubmit}>
        <fieldset>
          <label>Classes</label>
          <select value={users.classes} onChange={onChangeClasses}>
            <option value="">Select a class</option>
            {dataClasses.map((classItem) => (
              <option key={classItem?._id} value={classItem?._id}>
                {classItem?.activity?.name || ''}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          <label>Members</label>
          <select value={users.member} onChange={onChangeMember}>
            <option value="">Select a member</option>
            {dataMembers.map((memberItem) => (
              <option key={memberItem?._id} value={memberItem?._id}>
                {memberItem?.firstName}
              </option>
            ))}
          </select>
        </fieldset>
        <button type="submit">{selectedSubscription ? 'Update' : 'Add'}</button>
      </form>
    </>
  );
};

export default Form;