import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './form.module.css';
import SharedModal from '../../Shared/Modal';
import Button from '../../Shared/Button';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const [superAdmin, setSuperAdmin] = useState({
    firstName: '',
    email: '',
    password: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [typeStyle, setTypeStyle] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [bodyModal, setBodyModal] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getSuperAdminById = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
        method: 'GET'
      });
      const { data } = await response.json();
      setSuperAdmin({ firstName: data.firstName, email: data.email, password: data.password });
    } catch (error) {
      console.error(error);
    }
  };

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
      if (response.ok) {
        setTypeStyle('success');
        setTitleModal('Success');
        setBodyModal('Super Admin created successfully.');
        setShowSuccessModal(true);
        setShowErrorModal(false);
        setSuperAdmin({ firstName: '', email: '', password: '' });
        setIsSuccess(true);
      } else {
        setTypeStyle('error');
        setTitleModal('Error');
        setBodyModal(data.message);
        setShowModal(true);
        setShowSuccessModal(false);
        setIsSuccess(false);
      }
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
        setTypeStyle('success');
        setTitleModal('Success');
        setBodyModal('Super Admin updated successfully.');
        setShowSuccessModal(true);
        setShowErrorModal(false);
        setIsSuccess(true);
      } else {
        setTypeStyle('error');
        setTitleModal('Error');
        setBodyModal(data.message);
        setShowModal(true);
        setShowSuccessModal(false);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error(error);
      throw new Error('An error has occurred updating the Super Admin');
    }
  };

  useEffect(() => {
    if (id) {
      getSuperAdminById(id);
    }
  }, [id]);

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
    setShowModal(false);
    setShowSuccessModal(false);
  };

  const handleConfirm = () => {
    if (isSuccess) {
      history.replace('/super-admins');
    } else {
      setShowSuccessModal(false);
    }
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
        show={showModal || showErrorModal}
        typeStyle={typeStyle}
        title={titleModal}
        body={bodyModal}
        closeModal={closeModal}
        onConfirm={handleConfirm}
      />
      <SharedModal
        show={showSuccessModal}
        typeStyle="success"
        title="Success"
        body={id ? 'Super Admin updated successfully.' : 'Super Admin created successfully.'}
        closeModal={closeModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default Form;
