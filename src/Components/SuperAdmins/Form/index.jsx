import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './form.module.css';
import SharedModal from '../../Shared/Modal';
import Button from '../../Shared/Button';
import { getSuperAdminById } from '../../../Redux/superadmins/thunks';
import { useDispatch, useSelector } from 'react-redux';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const item = useSelector((state) => state.superAdmin.data);
  const [superAdmin, setSuperAdmin] = useState({
    firstName: '',
    email: '',
    password: ''
  });
  const [typeStyle, setTypeStyle] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [bodyModal, setBodyModal] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const addSuperAdmin = async (superAdmin) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
      const data = await response.json();
      if (data.ok) {
        setTypeStyle('success');
        setTitleModal('Success');
        setBodyModal('Super Admin created successfully.');
        setShowSuccessModal(true);
        setShowErrorModal(false);
        setSuperAdmin({ firstName: '', email: '', password: '' });
      }
      setTypeStyle('error');
      setTitleModal('Error');
      setBodyModal(data.message);
      setShowErrorModal(true);
      setShowSuccessModal(false);
    } catch (error) {
      console.error(error);
      throw new Error('An error has occurred creating the Super Admin');
    }
  };

  const updateSuperAdmin = async (id, superAdmin) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
      const data = await response.json();
      if (response.ok) {
        setShowSuccessModal(true);
        setShowErrorModal(false);
      } else {
        setTypeStyle('error');
        setTitleModal('Error');
        setBodyModal(data.message);
        setShowErrorModal(true);
        setShowSuccessModal(false);
      }
    } catch (error) {
      console.error(error);
      throw new Error('An error has occurred updating the Super Admin');
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getSuperAdminById(id));
    }
  }, [id]);

  useEffect(() => {
    if (id && item) {
      setSuperAdmin({
        firstName: item.firstName,
        email: item.email,
        password: item.password
      });
    }
  }, [item]);

  const onChange = (e) => {
    setSuperAdmin({
      ...superAdmin,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateSuperAdmin(id, superAdmin);
    } else {
      addSuperAdmin(superAdmin);
    }
  };

  const handleCancel = () => {
    history.push('/super-admins');
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    setShowErrorModal(false);
  };

  const handleConfirm = () => {
    history.push('/super-admins');
  };

  return (
    <div className={styles.superAdminFormContainer}>
      <form onSubmit={onSubmit} className={styles.formContainer}>
        <h2 className={styles.h2Style}>{id ? 'Update Super Admin' : 'Add Super Admin'}</h2>
        <div className={styles.fieldsetForm}>
          <label className={styles.label} htmlFor="firstName">
            Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={superAdmin.firstName}
            onChange={onChange}
            required
            className={styles.inputForm}
          />
        </div>
        <div className={styles.fieldsetForm}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={superAdmin.email}
            onChange={onChange}
            required
            className={styles.inputForm}
          />
        </div>
        <div className={styles.fieldsetForm}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={superAdmin.password}
            onChange={onChange}
            className={styles.inputForm}
          />
        </div>
        <div className={styles.buttonsContainer}>
          <Button text="Cancel" type="cancel" clickAction={handleCancel} />
          {id ? (
            <>
              <Button text="Confirm" type="submit" clickAction={onSubmit} />
            </>
          ) : (
            <Button text="Submit" type="submit" clickAction={onSubmit} />
          )}
        </div>
      </form>
      <SharedModal
        show={showErrorModal}
        typeStyle={typeStyle}
        title={titleModal}
        body={bodyModal}
        closeModal={closeModal}
      />
      <SharedModal
        show={showSuccessModal}
        typeStyle="success"
        title="Success"
        body={id ? 'Super Admin updated successfully.' : 'Super Admin created successfully.'}
        closeModal={handleConfirm}
      />
    </div>
  );
};

export default Form;
