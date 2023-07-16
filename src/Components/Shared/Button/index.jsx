import React from 'react';
import styles from './button.module.css';
import { EditTooltip, DeleteTooltip } from './Tooltip/Tooltip';

const Button = ({ text, clickAction, type, info, testId }) => {
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
      icon = <EditTooltip testId={testId} />;
      break;
    case 'delete':
      buttonStyle = styles.iconButton;
      icon = <DeleteTooltip testId={testId} s />;
      break;
    default:
      buttonStyle = styles.noButton;
  }

  return icon ? (
    <div onClick={clickAction} type={info} className={buttonStyle}>
      {icon}
    </div>
  ) : (
    <button onClick={clickAction} type={info} className={buttonStyle} id={testId}>
      {text}
    </button>
  );
};

export default Button;
