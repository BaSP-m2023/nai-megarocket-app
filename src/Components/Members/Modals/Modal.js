import styles from './Modal.module.css';

function Modal({ children, isOpen, closeModal, onConfirm }) {
  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            {children}
            <div className={styles.modalActions}>
              {onConfirm && <button onClick={onConfirm}>Confirm</button>}
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
