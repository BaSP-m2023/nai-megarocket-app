import { TextField } from '@mui/material';
import styles from './input.module.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const InputComponent = ({
  inputName,
  inputType,
  value,
  list,
  listProp,
  labelName,
  register,
  error,
  disabled,
  testId,
  errorTestId
}) => {
  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16
      },
      '&:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12
      },
      '&:after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12
      }
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2
    }
  }));
  const renderList = () => (
    <>
      <option value="" className={error ? error : null} id={testId}>
        Select an option
      </option>
      {list?.map((item) => {
        const properties = listProp?.split('.');
        const value = properties?.reduce((obj, prop) => obj[prop], item);
        return (
          <option
            key={item._id ? item._id : item}
            value={item._id ? item._id : item}
            id={`${testId}-${value ? value : item}`}
          >
            {value ? value : item}
          </option>
        );
      })}
    </>
  );
  const renderSelect = () => (
    <div className={styles.inputDiv}>
      <label>{labelName}</label>
      <select
        {...register(inputName)}
        name={inputName}
        className={error ? styles.formSelectError : styles.formSelect}
        value={value}
        disabled={disabled}
        id={testId}
      >
        {renderList()}
      </select>
      {error && (
        <p className={styles.errorMsg} id={errorTestId}>
          {error}
        </p>
      )}
    </div>
  );
  const renderInput = (type) => (
    <div className={styles.inputDiv} id={testId}>
      <TextField
        {...register(inputName)}
        name={inputName}
        className={error ? styles.formInputError : styles.formInput}
        type={type}
        helperText={error}
        error={error ? true : false}
        value={value}
        disabled={disabled}
        id={testId}
        variant="standard"
        size="small"
        label={labelName}
        {...(type === 'date' ? { InputLabelProps: { shrink: true } } : {})}
      />
    </div>
  );

  const renderIsActive = () => (
    <div id={testId}>
      <FormControlLabel
        control={<Android12Switch checked={value} />}
        label={labelName}
        {...register(inputName)}
        name={inputName}
        disabled={disabled}
        id={testId}
      />
    </div>
  );
  const renderInputType = (inputType) => {
    switch (inputType) {
      case 'text':
      case 'number':
      case 'password':
      case 'email':
      case 'date':
        return renderInput(inputType);
      case 'isActive':
        return renderIsActive();
      case 'list':
        return renderSelect();
      default:
        return null;
    }
  };
  return renderInputType(inputType);
};
export default InputComponent;
