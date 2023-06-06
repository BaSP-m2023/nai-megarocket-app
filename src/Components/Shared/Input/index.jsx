import { useState, useEffect } from 'react';
import styles from './input.module.css';

function InputComponent({
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
            className={styles['form-input']}
            type="text"
            value={text}
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
