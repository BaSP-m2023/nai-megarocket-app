import styles from './modal-module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }

  const onCloseModal = () => {
    props.onCloseModal();
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this subscription?</p>
        <div>
          <button onClick={onCloseModal}>Delete</button>
          <button onClick={props.closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
