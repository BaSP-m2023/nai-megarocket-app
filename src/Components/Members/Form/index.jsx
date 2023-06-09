import { useState, useEffect } from 'react';
import styles from './form.module.css';
import { useHistory, useParams } from 'react-router-dom';
import SharedModal from '../../Shared/Modal';
import Button from '../../Shared/Button';

const MemberForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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

  const formatDate = (dateString) => {
    const parts = dateString.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // Restar 1 al mes, ya que los meses en JavaScript son indexados desde 0 (enero = 0)
    const day = parseInt(parts[2]);
    const date = new Date(year, month, day);

    const formattedYear = date.getFullYear();
    const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const formattedDay = date.getDate().toString().padStart(2, '0');

    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
  };

  useEffect(() => {
    if (id) {
      getMemberById(id);
    }
  }, []);

  console.log(member);
  return (
    <>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>{id ? 'Update Member' : 'Add Member'}</h2>
        <SharedModal
          isDelete={false}
          show={showAlert}
          closeModal={handleCloseAlert}
          typeStyle={isSuccess ? 'success' : 'error'}
          title={isSuccess ? 'Success' : 'Something went wrong'}
          body={alertMessage}
        />
        <form className={styles.formMembers}>
          <div className={`${styles.formColumn} ${styles.formLeft}`}>
            <div className={styles.formInputs}>
              <label>Name</label>
              <input type="text" value={member.firstName} onChange={onChange} name="firstName" />
            </div>
            <div className={styles.formInputs}>
              <label>Last Name</label>
              <input type="text" value={member.lastName} onChange={onChange} name="lastName" />
            </div>
            <div className={styles.formInputs}>
              <label>DNI</label>
              <input type="text" value={member.dni} onChange={onChange} name="dni" />
            </div>
            <div className={styles.formInputs}>
              <label>Phone</label>
              <input type="text" value={member.phone} onChange={onChange} name="phone" />
            </div>
            <div className={styles.formInputs}>
              <label>Email</label>
              <input type="email" value={member.email} onChange={onChange} name="email" />
            </div>
          </div>
          <div className={`${styles.formColumn} ${styles.formRight}`}>
            <div className={styles.formInputs}>
              <label>Password</label>
              <input type="password" value={member.password} onChange={onChange} name="password" />
            </div>
            <div className={styles.formInputs}>
              <label>City</label>
              <input type="text" value={member.city} onChange={onChange} name="city" />
            </div>
            <div className={styles.formInputs}>
              <label>Date of birth</label>
              <input
                type="date"
                onClick={() => setIsEditing(true)}
                value={isEditing ? member.birthDay : formatDate(member.birthDay)}
                onChange={onChange}
                name="birthDay"
              />
            </div>
            <div className={styles.formInputs}>
              <label>ZIP code</label>
              <input type="text" value={member.postalCode} onChange={onChange} name="postalCode" />
            </div>
            <div className={styles.formInputsDiv}>
              <div className={styles.membershipActive}>
                <div>
                  <label>Memberships</label>
                  <select
                    className={styles.formSelect}
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
                <div>
                  <label>Active?</label>
                  <input
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
              </div>
            </div>
          </div>
        </form>
        <div className={styles.buttonContainer}>
          <Button text={'Cancel'} type={'cancel'} clickAction={() => history.push('/members')} />
          <Button text={id ? 'Update' : 'Add'} type={'submit'} clickAction={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default MemberForm;
