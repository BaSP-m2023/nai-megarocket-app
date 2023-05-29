import React from 'react';

function Modal(props) {
  if (!props.showModal) {
    return null;
  }

  const deleteItem = () => {
    props.confirmModal();
    props.closeModal();
  };

  return (
    <div>
      <div>
        <h3>{props.warning}</h3>
        <div>
          <button onClick={deleteItem}>Yes</button>
          <button onClick={props.closeModal}>No</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
