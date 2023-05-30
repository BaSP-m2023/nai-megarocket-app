import styles from './modalMember.module.css';

function Modal({ children, isOpen, closeModal, onConfirm }) {
  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            {children}
            <div className={styles.modalActions}>
              {onConfirm && (
                <button className={styles.botonModal} onClick={onConfirm}>
                  Confirm
                </button>
              )}
              <button className={styles.botonModal} onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
