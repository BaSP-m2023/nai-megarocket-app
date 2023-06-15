import styles from './input.module.css';

const InputComponent = ({
  inputName,
  inputType,
  value,
  list,
  listProp,
  labelName,
  onChange,
  placeholder
}) => {
  const renderList = () => (
    <>
      <option value="">Select an option</option>
      {list.map((e) => {
        const properties = listProp.split('.');
        const value = properties.reduce((obj, prop) => obj[prop], e);

        return (
          <option key={e._id} value={e._id}>
            {value}
          </option>
        );
      })}
    </>
  );

  const renderInput = (type) => (
    <div className={styles.inputDiv}>
      <label>{labelName}</label>
      <input
        name={inputName}
        required
        className={styles.formInput}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
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
        return (
          <div>
            <label>{labelName}</label>
            <input name={inputName} required type="checkbox" checked={value} onChange={onChange} />
          </div>
        );
      case 'list':
        return (
          <div className={styles.inputDiv}>
            <label>{labelName}</label>
            <select
              name={inputName}
              required
              className={styles.formInput}
              value={value}
              onChange={onChange}
            >
              {renderList()}
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return renderInputType(inputType);
};

export default InputComponent;
