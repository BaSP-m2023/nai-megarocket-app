import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateMember, getMembersById } from '../../../Redux/members/thunks';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './profile.module.css';
import SharedModal from '../../Shared/Modal';
import Button from '../../Shared/Button';
import Input from '../../Shared/Input/index';
import memberValidation from '../../../Validations/members';

const MemberForm = ({ memberData }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const membership = ['Black', 'Gold', 'Silver'];
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(memberValidation)
  });
  const id = '648e3c83b5cfaed572813eae';

  useEffect(() => {
    if (id) {
      fetchMemberById(id);
    }
  }, [id, memberData]);

  const fetchMemberById = async (id) => {
    try {
      const response = await dispatch(getMembersById(id));
      const member = response.data;
      const formattedMember = {
        ...member,
        birthDay: formatDate(member.birthDay)
      };
      delete formattedMember._id;
      delete formattedMember.__v;
      reset(formattedMember);
    } catch (error) {
      console.error('Member not found');
    }
  };

  const onSubmit = (data) => {
    memberUpdateFunction(id, data);
  };

  const memberUpdateFunction = async (id, member) => {
    try {
      const data = await dispatch(updateMember(id, member));
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
    setShowAlert(false);
  };

  const handleCancel = () => {
    history.push('/member');
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
        <h2 className={styles.formTitleTwo}>user data</h2>
        <SharedModal
          isDelete={false}
          show={showAlert}
          closeModal={handleCloseAlert}
          typeStyle={isSuccess ? 'success' : 'error'}
          title={isSuccess ? 'Success' : 'Something went wrong'}
          body={alertMessage}
        />
        <form className={styles.formMembers} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.formColumn} ${styles.formLeft}`}>
            <div className={styles.formInputs}>
              <Input
                register={register}
                labelName={'First Name'}
                inputType={'text'}
                inputName={'firstName'}
                error={errors.firstName?.message}
              />
            </div>
            <div className={styles.formInputs}>
              <Input
                register={register}
                labelName={'Last Name'}
                inputType={'text'}
                inputName={'lastName'}
                error={errors.lastName?.message}
              />
            </div>
            <div className={styles.formInputs}>
              <Input
                register={register}
                labelName={'DNI'}
                inputType={'number'}
                inputName={'dni'}
                error={errors.dni?.message}
              />
            </div>
            <div className={styles.formInputs}>
              <Input
                register={register}
                labelName={'Phone'}
                inputType={'number'}
                inputName={'phone'}
                error={errors.phone?.message}
              />
            </div>
            <div className={styles.formInputs}>
              <Input
                register={register}
                labelName={'Email'}
                inputType={'text'}
                inputName={'email'}
                error={errors.email?.message}
              />
            </div>
          </div>
          <div className={`${styles.formColumn} ${styles.formRight}`}>
            <div className={styles.formInputs}>
              <div style={{ display: 'flex' }}>
                <Input
                  register={register}
                  labelName={'Password'}
                  inputType={showPassword ? 'text' : 'password'}
                  inputName={'password'}
                  error={errors.password?.message}
                />
                <button
                  className={styles.toggleButton}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div className={styles.formInputs}>
              <Input
                register={register}
                labelName={'City'}
                inputType={'text'}
                inputName={'city'}
                error={errors.city?.message}
              />
            </div>
            <div className={styles.formInputs}>
              <Input
                register={register}
                labelName={'Date of birth'}
                inputType={'date'}
                inputName={'birthDay'}
                error={errors.birthDay?.message}
              />
            </div>
            <div className={styles.formInputs}>
              <Input
                register={register}
                labelName={'Postal Code'}
                inputType={'number'}
                inputName={'postalCode'}
                error={errors.postalCode?.message}
              />
            </div>
            <div className={styles.formInputs}>
              <Input
                register={register}
                labelName={'Memberships'}
                inputType={'text'}
                list={membership}
                inputName={'membership'}
                error={errors.membership?.message}
                readOnly
              />
              <Input
                register={register}
                labelName={'Active ?'}
                inputType={'checkbox'}
                inputName={'isActive'}
                error={errors.isActive}
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.buttonsLowContainer}>
              <Button text={'Cancel'} type={'cancel'} clickAction={handleCancel} />
              <Button text={'Confirm'} type={'submit'} info={'submit'} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MemberForm;
