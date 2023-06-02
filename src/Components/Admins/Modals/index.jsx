import styles from './modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }

  const onConfirmDelete = () => {
    props.deleteAdmins(props.idDelete);
    props.handleCancelDelete();
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h3 className={styles.h3}>{props.title}</h3>
        <p>{props.body}</p>
        <div className={styles.buttonContainer}>
          {props.isDelete ? (
            <>
              <button className={styles.deleteButton} onClick={onConfirmDelete}>
                Yes
              </button>
              <button className={styles.noButton} onClick={props.handleCancelDelete}>
                No
              </button>
            </>
          ) : (
            <button className={styles.noButton} onClick={props.handleCancelDelete}>
              Ok
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
