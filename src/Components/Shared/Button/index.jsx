import React from 'react';
import styles from './button.module.css';
import { FaEdit, FaTimes } from 'react-icons/fa';

const Button = ({ text, clickAction, type }) => {
  let buttonStyle = styles.button;
  let icon = null;

  switch (type) {
    case 'confirm':
      buttonStyle = styles.confirmButton;
      break;
    case 'cancel':
      buttonStyle = styles.cancelButton;
      break;
    case 'add':
      buttonStyle = styles.addButton;
      break;
    case 'submit':
      buttonStyle = styles.submitButton;
      break;
    case 'edit':
      buttonStyle = styles.iconButton;
      icon = <FaEdit />;
      break;
    case 'delete':
      buttonStyle = styles.iconButton;
      icon = <FaTimes />;
      break;
    default:
      buttonStyle = styles.noButton;
  }

  return (
    <button onClick={clickAction} className={buttonStyle}>
      {icon}
      {text}
    </button>
  );
};

export default Button;
