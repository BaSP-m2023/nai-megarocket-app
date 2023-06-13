import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './form.module.css';
import SharedModal from '../../Shared/Modal';
import Button from '../../Shared/Button';
import { updateSuperAdmin, addSuperAdmin } from '../../../Redux/superadmins/thunks';
import { useDispatch, useSelector } from 'react-redux';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const superAdmins = useSelector((state) => state.superAdmin.data.data);
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

  useEffect(() => {
    if (id) {
      superAdminById(id);
    }
  }, [id]);

  const superAdminById = (id) => {
    const superAdmin = superAdmins.find((superAdmin) => superAdmin._id === id);
    if (superAdmin) {
      delete superAdmin._id;
      delete superAdmin.__v;
      setSuperAdmin(superAdmin);
    } else {
      console.error('Super Admin not found');
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (id) {
      handleUpdate(id, superAdmin);
    } else {
      handleAdd(superAdmin);
    }
  };

  const handleUpdate = async (id, superAdmin) => {
    try {
      const { data } = await dispatch(updateSuperAdmin(id, superAdmin));
      setTypeStyle('success');
      setTitleModal('Success');
      setBodyModal(`The Super Admin ${data.firstName} was updated`);
      setShowSuccessModal(true);
    } catch (error) {
      setTypeStyle('error');
      setTitleModal('Error');
      setBodyModal(error.message);
      setShowErrorModal(true);
    }
  };

  const handleAdd = async (superAdmin) => {
    try {
      const data = await dispatch(addSuperAdmin(superAdmin));
      setTypeStyle('success');
      setTitleModal('Success');
      setBodyModal(`The Super Admin ${data.firstName} was created`);
      setShowSuccessModal(true);
    } catch (error) {
      setTypeStyle('error');
      setTitleModal('Error');
      setBodyModal(error.message);
      setShowErrorModal(true);
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

  const onChange = (e) => {
    setSuperAdmin({
      ...superAdmin,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.superAdminFormContainer}>
      <form className={styles.formContainer}>
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
        typeStyle={typeStyle}
        title={titleModal}
        body={bodyModal}
        closeModal={handleConfirm}
      />
    </div>
  );
};

export default Form;
