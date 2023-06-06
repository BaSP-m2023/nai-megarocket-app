import { useState, useEffect } from 'react';
import styles from './form.module.css';
import { useHistory, useParams } from 'react-router-dom';

const MemberForm = () => {
  const { id } = useParams();

  const history = useHistory();

  useEffect(() => {
    if (id) {
      getMembersById(id);
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (id) {
      updateMemberById(id);
    } else {
      createMember(member);
    }
  };

  const [member, setMember] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    password: '',
    city: '',
    birthDay: '',
    postalCode: '',

    membership: ''
  });

  const onChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value
    });
  };

  const getMembersById = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`);
      const data = await response.json();
      setMember(data.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateMemberById = async (id) => {
    try {
      const memberWithoutId = { ...member };
      delete memberWithoutId._id;
      delete memberWithoutId.__v;
      delete memberWithoutId.isActive;
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`, {
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
      history.push('/members');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createMember = async (member) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(member)
      });
      if (response.ok) {
        history.push('/members');
      } else {
        throw new Error('An error occurred while trying to add the member');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className={styles['form-container']}>
      <form className={styles['form-form']} onSubmit={handleSubmit}>
        <label className={styles['form-label']}>
          Name:
          <input
            className={styles['form-input']}
            type="text"
            value={member.firstName}
            onChange={onChange}
            name="firstName"
          />
        </label>
        <label className={styles['form-label']}>
          Last Name:
          <input
            className={styles['form-input']}
            type="text"
            value={member.lastName}
            onChange={onChange}
            name="lastName"
          />
        </label>
        <label className={styles['form-label']}>
          DNI:
          <input
            className={styles['form-input']}
            type="text"
            value={member.dni}
            onChange={onChange}
            name="dni"
          />
        </label>
        <label className={styles['form-label']}>
          Phone:
          <input
            className={styles['form-input']}
            type="text"
            value={member.phone}
            onChange={onChange}
            name="phone"
          />
        </label>
        <label className={styles['form-label']}>
          Email:
          <input
            className={styles['form-input']}
            type="email"
            value={member.email}
            onChange={onChange}
            name="email"
          />
        </label>
        <label className={styles['form-label']}>
          Password:
          <input
            className={styles['form-input']}
            type="password"
            value={member.password}
            onChange={onChange}
            name="password"
          />
        </label>
        <label className={styles['form-label']}>
          City:
          <input
            className={styles['form-input']}
            type="text"
            value={member.city}
            onChange={onChange}
            name="city"
          />
        </label>
        <label className={styles['form-label']}>
          Date of birth:
          <input
            className={styles['form-input']}
            type="date"
            value={member.birthDay}
            onChange={onChange}
            name="birthDay"
          />
        </label>
        <label className={styles['form-label']}>
          ZIP code:
          <input
            className={styles['form-input']}
            type="text"
            value={member.postalCode}
            onChange={onChange}
            name="postalCode"
          />
        </label>

        <label className={styles['form-label']}>
          Memberships:
          <select
            className={styles['form-select']}
            value={member.membership}
            onChange={onChange}
            name="membership"
          >
            <option value="">Select an option</option>
            <option value="Black">Black</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
          </select>
        </label>
        <div className={styles['button-container']}>
          <button className={styles['form-button']} type="submit">
            submit
          </button>

          <button className={styles['form-button']} type="button" onClick={() => history.goBack()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;
