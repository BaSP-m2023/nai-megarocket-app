import styles from './input.module.css';

const InputComponent = ({
  inputName,
  inputType,
  value,
  list,
  listProp,
  labelName,
  placeholder,
  register,
  error,
  disabled
}) => {
  const renderList = () => (
    <>
      <option value="" className={error ? error : null}>
        Select an option
      </option>
      {list?.map((item) => {
        const properties = listProp?.split('.');
        const value = properties?.reduce((obj, prop) => obj[prop], item);

        return (
          <option key={item._id ? item._id : item} value={item._id ? item._id : item}>
            {value ? value : item}
          </option>
        );
      })}
    </>
  );

  const renderSelect = () => (
    <div className={styles.inputDiv}>
      <label htmlFor={inputName}>{labelName}</label>
      <select
        {...register(inputName)}
        name={inputName}
        id={inputName}
        autoComplete="off"
        className={error ? styles.formSelectError : styles.formSelect}
        value={value}
        disabled={disabled}
      >
        {renderList()}
      </select>
      {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  );

  const renderInput = (type) => (
    <div className={styles.inputDiv}>
      <label htmlFor={inputName}>{labelName}</label>
      <input
        {...register(inputName)}
        name={inputName}
        id={inputName}
        autoComplete="off"
        className={error ? styles.formInputError : styles.formInput}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  );

  const renderIsActive = () => (
    <div>
      <label>{labelName}</label>
      <input {...register(inputName)} name={inputName} type="checkbox" disabled={disabled} />{' '}
      {error && <p className={styles.errorMsg}>{error}</p>}
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
