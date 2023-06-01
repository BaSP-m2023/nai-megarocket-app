import styles from './modal.module.css';

const ModalClose = ({ message, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <button className={styles.btn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalClose;
