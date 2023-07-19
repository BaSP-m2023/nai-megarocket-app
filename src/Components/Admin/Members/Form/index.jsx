import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateMember, addMember } from 'Redux/members/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './form.module.css';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import memberValidation from 'Validations/Admin/members';
import Container from 'Components/Shared/Container';
import toast, { Toaster } from 'react-hot-toast';
import { FiArrowLeft } from 'react-icons/fi';
import { FormControl, InputLabel, FormHelperText, MenuItem, Select } from '@mui/material';

const MemberForm = () => {
  const members = useSelector((state) => state.members.data.data);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const membership = ['Only Classes', 'Classic', 'Black'];
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
    resolver: joiResolver(memberValidation)
  });

  useEffect(() => {
    toast.remove();
    if (id) {
      memberById(id);
    }
  }, []);

  const memberById = (id) => {
    const member = members.find((member) => member._id === id);
    if (member) {
      member.birthDay = formatDate(member.birthDay);
      delete member._id;
      delete member.__v;
      delete member.firebaseUid;
      delete member.createdAt;
      delete member.updatedAt;
      reset(member);
    } else {
      console.error('Member not found');
    }
  };

  const onSubmit = (data) => {
    if (id) {
      memberUpdateFunction(id, data);
      delete data.isActive;
      delete data.password;
    } else {
      memberAddFunction(data);
    }
  };

  const memberUpdateFunction = async (id, member) => {
    try {
      const response = await dispatch(updateMember(id, member));
      localStorage.setItem('toastMessage', response.message);
      history.push('/admins/members');
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const memberAddFunction = async (member) => {
    try {
      const response = await dispatch(addMember(member));
      localStorage.setItem('toastMessage', response.message);
      history.push('/admins/members');
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      duration: 2500,
      position: 'top-right',
      style: {
        background: 'rgba(227, 23, 10, 0.5)'
      },
      iconTheme: {
        primary: '#0f232e',
        secondary: '#fff'
      }
    });
  };

  const handleCancel = () => {
    history.push('/admins/members');
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
    <Container>
      <Toaster
        containerStyle={{
          margin: '10vh 0 0 0'
        }}
      />
      <div className={styles.formContainer}>
        {' '}
        <div className={styles.head}>
          {' '}
          <div id="admin-form-go-back" className={styles.arrow} onClick={handleCancel}>
            <FiArrowLeft size={35} />
          </div>
          <h2 className={styles.formTitle}> {id ? 'Update Member' : 'Add Member'}</h2>
        </div>
        <form className={styles.formMembers} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.formColumn} ${styles.formLeft}`}>
            <Input
              register={register}
              labelName={'First Name'}
              inputType={'text'}
              inputName={'firstName'}
              error={errors.firstName?.message}
              testId={'admin-input-first-name'}
            />
            <Input
              register={register}
              labelName={'Last Name'}
              inputType={'text'}
              inputName={'lastName'}
              error={errors.lastName?.message}
              testId={'admin-input-last-name'}
            />
            <Input
              register={register}
              labelName={'DNI'}
              inputType={'number'}
              inputName={'dni'}
              error={errors.dni?.message}
              testId={'admin-input-dni'}
            />
            <Input
              register={register}
              labelName={'Phone'}
              inputType={'number'}
              inputName={'phone'}
              error={errors.phone?.message}
              testId={'admin-input-phone'}
            />
            <Input
              register={register}
              labelName={'Email'}
              inputType={'text'}
              inputName={'email'}
              error={errors.email?.message}
              testId={'admin-input-email'}
            />
          </div>
          <div className={`${styles.formColumn} ${styles.formRight}`}>
            {!id && (
              <Input
                register={register}
                labelName={'Password'}
                inputType={'password'}
                inputName={'password'}
                error={errors.password?.message}
                testId={'admin-input-password'}
              />
            )}
            <Input
              register={register}
              labelName={'City'}
              inputType={'text'}
              inputName={'city'}
              error={errors.city?.message}
              testId={'admin-input-city'}
            />
            <Input
              register={register}
              labelName={'Date of birth'}
              inputType={'date'}
              inputName={'birthDay'}
              error={errors.birthDay?.message}
              testId={'admin-input-date'}
            />
            <Input
              register={register}
              labelName={'Postal Code'}
              inputType={'number'}
              inputName={'postalCode'}
              error={errors.postalCode?.message}
              testId={'admin-input-zip'}
            />
            <FormControl
              sx={{ width: '20vw' }}
              variant="standard"
              fullWidth
              error={errors.membership?.message}
            >
              <InputLabel id="Memberships">Memberships</InputLabel>
              <Select {...register('membership')} id={'admin-input-membership'}>
                {membership.map((membership) => (
                  <MenuItem
                    key={membership}
                    value={membership}
                    id={'admin-input-membership-' + membership}
                  >
                    {membership}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.membership?.message}</FormHelperText>
            </FormControl>
            {id && (
              <Input
                register={register}
                labelName={'Active ?'}
                value={watch('isActive')}
                inputType={'isActive'}
                inputName={'isActive'}
                error={errors.isActive}
                testId={'admin-input-checkbox'}
              />
            )}
          </div>
          <div className={styles.buttonContainer}>
            <Button
              text={id ? 'Update' : 'Add'}
              type={'submit'}
              info={'submit'}
              testId={'admin-button-submit-form'}
            />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default MemberForm;
