import styles from './header.module.css';
import { logout } from 'Redux/auth/thunks';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SharedModal from 'Components/Shared/Modal/index';

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [bodyModal, setBodyModal] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const showModalLogout = () => {
    setTitleModal('Warning');
    setBodyModal('You want to log out?');
    setShowModal(true);
  };

  const role = sessionStorage.getItem('role');

  const routePath = () => {
    switch (role) {
      case 'ADMIN':
        return '/admins';
      case 'SUPER_ADMIN':
        return '/super-admins';
      case 'TRAINER':
        return '/trainers';
      case 'MEMBER':
        return '/members';
      default:
        return '';
    }
  };

  const handleLogOut = () => {
    dispatch(logout());
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('token');
    setShowModal(false);
    localStorage.setItem('toastMessage', 'See you soon!');
    history.push('/auth/login');
  };

  return (
    <>
      <header className={styles.container}>
        <div onClick={() => history.push(`${routePath()}/landing`)} className={styles.brand}>
          <img src="/assets/images/logos/logo-1.png" alt="logo" />
        </div>

        <div className={styles.icons}>
          <a id="logout-bar-link" onClick={showModalLogout} rel="noopener noreferrer">
            <img
              className={styles.logOut}
              src={`${process.env.PUBLIC_URL}/assets/images/log-in-1.svg`}
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
      </header>
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

export default Header;
