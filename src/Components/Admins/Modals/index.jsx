import styles from './modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }

  const onCloseModal = () => {
    props.onCloseModal();
    props.closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3>WARNING</h3>
        <p>Do you want to delete this admin?</p>
        <div className={styles.buttonContainer}>
          <button className={styles.deleteButton} onClick={onCloseModal}>
            Yes
          </button>
          <button className={styles.noButton} onClick={props.closeModal}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
