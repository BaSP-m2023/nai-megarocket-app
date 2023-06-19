import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import SharedModal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';
import InputComponent from 'Components/Shared/Input';
import styles from './form.module.css';
import { useDispatch } from 'react-redux';
import { updateSuperAdmin, addSuperAdmin, getSuperAdminById } from 'Redux/superadmins/thunks';
import { useForm } from 'react-hook-form';
import superAdminValidation from 'Validations/super-admins';
import { joiResolver } from '@hookform/resolvers/joi';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [typeStyle, setTypeStyle] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [bodyModal, setBodyModal] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
    resolver: joiResolver(superAdminValidation)
  });

  const getSuperAdminData = async () => {
    try {
      const response = await dispatch(getSuperAdminById(id));
      const superAdminData = response.data;
      delete superAdminData._id;
      delete superAdminData.__v;
      reset(superAdminData);
    } catch (error) {
      showErrorModal(error);
    }
  };

  useEffect(() => {
    if (id) {
      getSuperAdminData(id);
    }
  }, []);

  const onSubmit = (data) => {
    if (id) {
      handleUpdate(id, data);
    } else {
      handleAdd(data);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const response = await dispatch(updateSuperAdmin(id, data));
      setTypeStyle('success');
      setTitleModal('Success');
      setBodyModal(response.message);
      setShowSuccessModal(true);
    } catch (error) {
      setTypeStyle('error');
      setTitleModal('Error');
      setBodyModal(error.message);
      setShowErrorModal(true);
    }
  };

  const handleAdd = async (data) => {
    try {
      const response = await dispatch(addSuperAdmin(data));
      setTypeStyle('success');
      setTitleModal('Success');
      setBodyModal(response.message);
      setShowSuccessModal(true);
    } catch (error) {
      setTypeStyle('error');
      setTitleModal('Error');
      setBodyModal(error.message);
      setShowErrorModal(true);
    }
  };

  const handleCancel = () => {
    history.push('/super-admin/super-admins');
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    setShowErrorModal(false);
  };

  const handleConfirm = () => {
    history.push('/super-admin/super-admins');
  };

  return (
    <div className={styles.superAdminFormContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.h2Style}>{id ? 'Update Super Admin' : 'Add Super Admin'}</h2>
        <div className={styles.fieldsetForm}>
          <InputComponent
            register={register}
            inputName="firstName"
            inputType="text"
            labelName="Name"
            required
            className={styles.inputForm}
            error={errors.firstName?.message}
          />
        </div>
        <div className={styles.fieldsetForm}>
          <InputComponent
            register={register}
            inputName="email"
            inputType="email"
            labelName="Email"
            required
            className={styles.inputForm}
            error={errors.email?.message}
          />
        </div>
        <div className={styles.fieldsetForm}>
          <InputComponent
            register={register}
            inputName="password"
            inputType="password"
            labelName="Password"
            className={styles.inputForm}
            error={errors.password?.message}
          />
        </div>
        <div className={styles.buttonsContainer}>
          <Button text={id ? 'Update' : 'Add'} type="submit" info={'submit'} />
          <div className={styles.buttonsLow}>
            <Button text="Back" type="cancel" clickAction={handleCancel} />
            <Button type={'cancel'} clickAction={() => reset()} text={'Reset'} info={'reset'} />
          </div>
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
