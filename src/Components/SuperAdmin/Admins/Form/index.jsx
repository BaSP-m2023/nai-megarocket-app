import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { putAdmin, postAdmin } from 'Redux/admins/thunks';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import SharedModal from '../../Shared/Modal';

const Form = () => {
  const admins = useSelector((state) => state.admins.data);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [admin, setAdmin] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    password: ''
  });

  useEffect(() => {
    if (id) {
      getAdminById(id);
    }
  }, []);

  const getAdminById = (id) => {
    const admin = admins.find((admin) => admin._id === id);
    if (admin) {
      delete admin._id;
      delete admin.__v;
      delete admin.createdAt;
      delete admin.updatedAt;
      setAdmin(admin);
    } else {
      console.error('Admin not found');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      putAdminFunction(id, admin);
    } else {
      postAdminFunction(admin);
    }
  };

  const postAdminFunction = async (admin) => {
    try {
      const data = await dispatch(postAdmin(admin));
      setAlertMessage(data.message);
      setIsSuccess(true);
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(error.message);
      setIsSuccess(false);
      setShowAlert(true);
    }
  };

  const putAdminFunction = async (id, admin) => {
    try {
      const data = await dispatch(putAdmin(id, admin));
      setAlertMessage(data.message);
      setIsSuccess(true);
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(error.message);
      setIsSuccess(false);
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    if (isSuccess) {
      history.push('/admins');
    } else {
      setShowAlert(false);
    }
  };

  const handleOnChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value
    });
  };

  const handleCancel = () => {
    if (showAlert) {
      setShowAlert(false);
    }
    setShowAlert(false);
    history.push('/admins');
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>{id ? 'Update Admin' : 'Add Admin'}</h2>
      <SharedModal
        isDelete={false}
        show={showAlert}
        closeModal={handleCloseAlert}
        typeStyle={isSuccess ? 'success' : 'error'}
        title={isSuccess ? 'Success' : 'Something went wrong'}
        body={alertMessage}
      />
      <form className={styles.formAdmin}>
        <div className={styles.firstInputs}>
          <div className={styles.formInput}>
            <h3 className={styles.h3}>Name</h3>
            <input
              name="firstName"
              type="text"
              value={admin.firstName}
              placeholder="Name"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className={styles.formInput}>
            <h3 className={styles.h3}>Last Name</h3>
            <input
              name="lastName"
              type="text"
              value={admin.lastName}
              placeholder="Last Name"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className={styles.formInput}>
            <h3 className={styles.h3}>DNI</h3>
            <input
              name="dni"
              type="number"
              value={admin.dni}
              placeholder="DNI"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className={styles.formInput}>
            <h3 className={styles.h3}>Phone</h3>
            <input
              name="phone"
              type="number"
              value={admin.phone}
              placeholder="Phone"
              onChange={handleOnChange}
              required
            />
          </div>
        </div>
        <div className={styles.secondInputs}>
          <div className={styles.formInput}>
            <h3 className={styles.h3}>Email</h3>
            <input
              name="email"
              type="text"
              value={admin.email}
              placeholder="Email"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className={styles.formInput}>
            <h3 className={styles.h3}>City</h3>
            <input
              name="city"
              type="text"
              value={admin.city}
              placeholder="City"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className={styles.formInput}>
            <h3 className={styles.h3}>Password</h3>
            <input
              name="password"
              type="text"
              value={admin.password}
              placeholder="Password"
              onChange={handleOnChange}
              required
            />
          </div>
        </div>
        <div className={styles.buttonsAdmin}>
          <Button text={'Cancel'} type={'cancel'} clickAction={handleCancel} />
          <Button text={'Submit'} type={'submit'} clickAction={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default Form;
