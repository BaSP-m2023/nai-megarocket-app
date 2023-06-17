import styles from './input.module.css';

const Input = (props) => {
  return (
    <input
      className={styles.input}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
    />
  );
};

export default Input;
