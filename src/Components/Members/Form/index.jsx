import { useState, useEffect } from 'react';
import styles from './form.module.css';
import { useHistory, useParams } from 'react-router-dom';
import SharedModal from '../../Shared/Modal';
import Button from '../../Shared/Button';

const MemberForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
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
    isActive: false,
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(memberWithoutId)
      });
      const data = await response.json();
      if (!response.ok) {
        setAlertMessage(data.message);
        setShowAlert(true);
      } else {
        setAlertMessage(data.message);
        setShowSuccessAlert(true);
      }
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
      const data = await response.json();
      if (!response.ok) {
        setAlertMessage(data.message);
        setShowAlert(true);
      }
      setAlertMessage(data.message);
      setShowSuccessAlert(true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleCloseAlert = () => {
    if (showSuccessAlert) {
      setShowAlert(false);
      history.push('/members');
    }
    setShowAlert(false);
  };

  return (
    <>
      <SharedModal
        isDelete={false}
        show={showAlert}
        closeModal={handleCloseAlert}
        title={'Something went wrong'}
        body={alertMessage}
      />
      <SharedModal
        isDelete={false}
        show={showSuccessAlert}
        closeModal={handleCloseAlert}
        title={'Success'}
        body={alertMessage}
      />
      <div className={styles['form-container']}>
        <form className={styles['form-form']}>
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
            Is Active?
            <input
              className={styles['form-input']}
              type="checkbox"
              checked={member.isActive}
              onChange={(e) => {
                setMember({
                  ...member,
                  isActive: e.target.checked
                });
              }}
              name="isActive"
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
            <Button text={id ? 'Update' : 'Add'} type={'confirm'} clickAction={handleSubmit} />
            <Button text={'Cancel'} type={'cancel'} clickAction={() => history.push('/members')} />
          </div>
        </form>
      </div>
    </>
  );
};

export default MemberForm;
