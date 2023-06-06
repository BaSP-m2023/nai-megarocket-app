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
    <div className={styles.modalAdminOverlay}>
      <div className={styles.modalAdmin}>
        <h3 className={styles.h3}>{props.title}</h3>
        <p>{props.body}</p>
        <div>
          {props.isDelete ? (
            <>
              <button className={styles.buttonAdmin} onClick={onConfirmDelete}>
                Yes
              </button>
              <button className={styles.buttonAdmin} onClick={props.handleCancelDelete}>
                No
              </button>
            </>
          ) : (
            <button className={styles.buttonAdmin} onClick={props.handleCancelDelete}>
              Ok
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
