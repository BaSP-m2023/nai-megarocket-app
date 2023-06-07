import { useState, useEffect } from 'react';
import styles from './form.module.css';
import { useHistory, useParams } from 'react-router-dom';
import SharedModal from '../../Shared/Modal';
import Button from '../../Shared/Button';

const MemberForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { id } = useParams();
  const history = useHistory();

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      updateMember(id);
    } else {
      addMember(member);
    }
  };

  const onChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value
    });
  };

  const getMemberById = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`);
      const data = await response.json();
      setMember(data.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateMember = async (id) => {
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
        setIsSuccess(false);
        setShowAlert(true);
      } else {
        setAlertMessage(data.message);
        setIsSuccess(true);
        setShowAlert(true);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const addMember = async (member) => {
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
        setIsSuccess(false);
        setShowAlert(true);
      } else {
        setAlertMessage(data.message);
        setIsSuccess(true);
        setShowAlert(true);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleCloseAlert = () => {
    if (isSuccess) {
      history.push('/members');
    } else {
      setShowAlert(false);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (id) {
      getMemberById(id);
    }
  }, [id]);

  return (
    <>
      <div className={styles['form-container']}>
        <SharedModal
          isDelete={false}
          show={showAlert}
          closeModal={handleCloseAlert}
          typeStyle={isSuccess ? 'success' : 'error'}
          title={isSuccess ? 'Success' : 'Something went wrong'}
          body={alertMessage}
        />
        <form className={styles['form-form']}>
          <div className={`${styles['form-column']} ${styles['form-left-column']}`}>
            <div className={styles.formInputs}>
              <label>Name</label>
              <input
                className={styles['form-input']}
                type="text"
                value={member.firstName}
                onChange={onChange}
                name="firstName"
              />
            </div>
            <div className={styles.formInputs}>
              <label>Last Name</label>
              <input
                className={styles['form-input']}
                type="text"
                value={member.lastName}
                onChange={onChange}
                name="lastName"
              />
            </div>
            <div className={styles.formInputs}>
              <label>DNI</label>
              <input
                className={styles['form-input']}
                type="text"
                value={member.dni}
                onChange={onChange}
                name="dni"
              />
            </div>
            <div className={styles.formInputs}>
              <label>Phone</label>
              <input
                className={styles['form-input']}
                type="text"
                value={member.phone}
                onChange={onChange}
                name="phone"
              />
            </div>
            <div className={styles.formInputs}>
              <label>Email</label>
              <input
                className={styles['form-input']}
                type="email"
                value={member.email}
                onChange={onChange}
                name="email"
              />
            </div>
          </div>
          <div className={`${styles['form-column']} ${styles['form-right-column']}`}>
            <div className={styles.formInputs}>
              <label>Password</label>
              <input
                className={styles['form-input']}
                type="password"
                value={member.password}
                onChange={onChange}
                name="password"
              />
            </div>
            <div className={styles.formInputs}>
              <label>City</label>
              <input
                className={styles['form-input']}
                type="text"
                value={member.city}
                onChange={onChange}
                name="city"
              />
            </div>
            <div className={styles.formInputs}>
              <label>Date of birth</label>
              <input
                className={styles['form-input']}
                type="date"
                value={formatDate(member.birthDay)}
                onChange={onChange}
                name="birthDay"
              />
            </div>
            <div className={styles.formInputs}>
              <label>ZIP code</label>
              <input
                className={styles['form-input']}
                type="text"
                value={member.postalCode}
                onChange={onChange}
                name="postalCode"
              />
            </div>
            <div className={styles.formInputs}>
              <label>Memberships</label>
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
            </div>
            <label>Is Active?</label>
            <input
              className={styles['form-checkbox']}
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
          </div>
        </form>
        <div className={styles['button-container']}>
          <Button text={id ? 'Update' : 'Add'} type={'confirm'} clickAction={handleSubmit} />
          <Button text={'Cancel'} type={'cancel'} clickAction={() => history.push('/members')} />
        </div>
      </div>
    </>
  );
};

export default MemberForm;
