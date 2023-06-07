import { useState, useEffect } from 'react';
import styles from './input.module.css';

function InputComponent({
  inputName,
  inputType,
  value,
  list,
  listProp,
  labelName,
  editMode,
  useStateItem,
  placeholder
}) {
  const [text, setText] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [listItem, setListItem] = useState('');

  const dateInput = new Date(value);

  useEffect(() => {
    if (editMode) {
      switch (inputType) {
        case 'text':
          setText(value);
          break;

        case 'number':
          setNumber(value);
          break;

        case 'password':
          setPassword(value);
          break;

        case 'email':
          setEmail(value);
          break;

        case 'date':
          setDate(dateInput.toISOString().substring(0, 10));
          break;

        case 'isActive':
          setIsActive(value);
          break;

        case 'list':
          setListItem(value);
          break;

        default:
          break;
      }
    } else {
      setText('');
      setDate('');
      setIsActive('');
      setListItem('');
    }
  }, [value]);

  const renderList = () => {
    return (
      <>
        <option value="">Select an option</option>
        {list.map((e) => (
          <option key={e._id} value={e._id}>
            {e[listProp]}
          </option>
        ))}
        ;
      </>
    );
  };

  const renderInputType = (inputType) => {
    if (inputType === 'text') {
      return (
        <label className={styles['form-label']}>
          <h2>{labelName}</h2>
          <input
            name={inputName}
            required
            className={styles['form-input']}
            type="text"
            value={text}
            onChange={(event) => useStateItem(event.target.value)}
            placeholder={placeholder}
          />
        </label>
      );
    }

    if (inputType === 'number') {
      return (
        <label className={styles['form-label']}>
          <h2>{labelName}</h2>
          <input
            name={inputName}
            required
            className={styles['form-input']}
            type="number"
            value={number}
            onChange={(event) => useStateItem(event.target.value)}
            placeholder={placeholder}
          />
        </label>
      );
    }

    if (inputType === 'password') {
      return (
        <label className={styles['form-label']}>
          <h2>{labelName}</h2>
          <input
            name={inputName}
            required
            className={styles['form-input']}
            type="password"
            value={password}
            onChange={(event) => useStateItem(event.target.value)}
            placeholder={placeholder}
          />
        </label>
      );
    }

    if (inputType === 'email') {
      return (
        <label className={styles['form-label']}>
          <h2>{labelName}</h2>
          <input
            name={inputName}
            required
            className={styles['form-input']}
            type="email"
            value={email}
            onChange={(event) => useStateItem(event.target.value)}
            placeholder={placeholder}
          />
        </label>
      );
    }

    if (inputType === 'date') {
      return (
        <label className={styles['form-label']}>
          <h2>{labelName}</h2>
          <input
            name={inputName}
            required
            className={styles['form-input']}
            type="date"
            value={date}
            onChange={(event) => useStateItem(event.target.value)}
          />
        </label>
      );
    }

    if (inputType === 'isActive') {
      return (
        <label className={styles['form-label']}>
          <h2>{labelName}</h2>
          <input
            name={inputName}
            required
            className={styles['form-input']}
            type="checkbox"
            checked={isActive}
            onChange={(event) => useStateItem(event.target.checked)}
          />
        </label>
      );
    }

    if (inputType === 'list') {
      return (
        <label className={styles['form-label']}>
          <h2>{labelName}</h2>
          <select
            name={inputName}
            required
            className={styles['form-select']}
            value={listItem}
            onChange={(event) => useStateItem(event.target.value)}
          >
            {renderList()}
          </select>
        </label>
      );
    }
  };

  return renderInputType(inputType);
}

export default InputComponent;
