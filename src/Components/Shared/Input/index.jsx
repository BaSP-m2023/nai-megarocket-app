import { useState, useEffect } from 'react';
import styles from './input.module.css';

function InputComponent({ inputType, data, list, listProp, labelName, editMode, useStateItem }) {
  // inputType (text, date, isActive, list)
  // data puede ser cualquier cosa que va en el value del input
  // list lista para hacer .map, si no mandar null
  // listProp es el string que va después del punto en el .map
  // labelName es string
  // editMode true o false

  // ejemplo:

  //   <InputComponent
  //   inputType={'text'}
  //   data={firstName}
  //   list={null}
  //   listProp={null}
  //   labelName={'first name'}
  //   editMode={true}
  //   useStateItem={setFirstName}
  //   />

  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [listItem, setListItem] = useState('');

  useEffect(() => {
    if (editMode) {
      switch (inputType) {
        case 'text':
          setText(data);
          break;

        case 'date':
          setDate(data);
          // que el componente haga la transformación o que lo haga el componente hablar con gonza
          break;

        case 'isActive':
          setIsActive(data);
          break;

        case 'list':
          setListItem(data);
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
  }, [data]);

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
