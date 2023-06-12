import { useState, useEffect } from 'react';
import styles from './form.module.css';
import { useHistory, useParams } from 'react-router-dom';
import SharedModal from '../../Shared/Modal';
import Button from '../../Shared/Button';
import { useSelector, useDispatch } from 'react-redux';
import { updateMember, addMember } from '../../../Redux/members/thunks';

const MemberForm = () => {
  const members = useSelector((state) => state.members.data.data);
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (id) {
      memberById(id);
    }
  }, [id]);

  const memberById = (id) => {
    const member = members.find((member) => member._id === id);
    if (member) {
      setMember(member);
    } else {
      console.error('Member not found');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      const memberUpdate = { ...member };
      delete memberUpdate._id;
      delete memberUpdate.__v;
      memberUpdateFunction(id, memberUpdate);
    } else {
      memberAddFunction(member);
    }
  };

  const memberUpdateFunction = async (id, member) => {
    try {
      const data = await dispatch(updateMember(id, member));
      setAlertMessage(data.message);
      setIsSuccess(true);
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(error.message);
      console.log(error);
      setIsSuccess(false);
      setShowAlert(true);
    }
  };

  const memberAddFunction = async (member) => {
    try {
      const data = await dispatch(addMember(member));
      setAlertMessage(data.message);
      setIsSuccess(true);
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(error.message);
      console.log(error);
      setIsSuccess(false);
      setShowAlert(true);
    }
  };

  const onChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value
    });
  };

  const handleCloseAlert = () => {
    if (isSuccess) {
      history.push('/members');
    } else {
      setShowAlert(false);
    }
  };

  const handleCancel = () => {
    history.push('/members');
  };

  const formatDate = (dateString) => {
    const parts = dateString.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const day = parseInt(parts[2]);
    const date = new Date(year, month, day);

    const formattedYear = date.getFullYear();
    const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const formattedDay = date.getDate().toString().padStart(2, '0');

    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
  };

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
          <Button text={'Cancel'} type={'cancel'} clickAction={handleCancel} />
          <Button text={id ? 'Update' : 'Add'} type={'submit'} clickAction={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default MemberForm;
