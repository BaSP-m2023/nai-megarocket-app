import { useState } from 'react';
import styles from './footer.module.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SharedModal from 'Components/Shared/Modal/index';

function Footer() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [bodyModal, setBodyModal] = useState('');
  const history = useHistory();

  const showModalLogout = (showModal) => {
    setTitleModal('Warning:');
    setBodyModal('Are you sure you want to log out?');
    setShowModal(showModal);
  };

  const handleLogOut = () => {
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('token');
    setShowModal(false);
    localStorage.setItem('toastMessage', 'See you soon!');
    history.push('/auth/login');
  };

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.icons}>
          <a id="logout-bar-link" onClick={showModalLogout} rel="noopener noreferrer">
            <img
              className={styles.logOut}
              src={`${process.env.PUBLIC_URL}/assets/images/log-in.svg`}
            />
          </a>
          <a
            id="facebook-bar-link"
            href={'https://www.facebook.com/radiumrocket'}
            target={'_blank'}
            rel="noreferrer"
          >
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
            />
          </a>
          <a
            id="twitter-bar-link"
            href={'https://twitter.com/radiumrocket'}
            target={'_blank'}
            rel="noreferrer"
          >
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
            />
          </a>
          <a
            id="instagram-bar-link"
            href={'https://www.instagram.com/radium.rocket/'}
            target={'_blank'}
            rel="noreferrer"
          >
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
            />
          </a>
        </div>
      </footer>
      {showModal && (
        <SharedModal
          isDelete={true}
          show={showModal}
          title={titleModal}
          body={bodyModal}
          closeModal={() => setShowModal(false)}
          onConfirm={handleLogOut}
          testId={'logout-modal'}
          closeTestId={'logout-button-close-success-modal'}
        />
      )}
    </>
  );
}

export default Footer;
