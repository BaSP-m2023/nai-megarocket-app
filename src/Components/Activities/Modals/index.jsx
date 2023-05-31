import styles from './modal.module.css';

const Modal = (props) => {
  if (!props.show) {
    return null;
  }
  const CloseModal = () => {
    props.closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div>
          <h3 className={styles.title}>{props.title}</h3>
        </div>
        <div>
          <button className={styles.closeButton} onClick={CloseModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
