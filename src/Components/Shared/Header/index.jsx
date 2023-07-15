import styles from './header.module.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import DropDownMenu from 'Components/Shared/DropDownMenu/index';

function Header({ profileRoute }) {
  const history = useHistory();
  const userData = useSelector((state) => state.auth.user);
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

  const loginLink = () => {
    history.push('/auth/login');
  };

  const singUpLink = () => {
    history.push('/auth/register');
  };

  return (
    <>
      <header className={styles.container}>
        <div
          id="logo-button-header"
          onClick={() => {
            history.push(!role ? `${routePath()}/landing` : `${routePath()}/home`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={styles.brand}
        >
          <img src="/assets/images/logos/logo-3.png" alt="logo" className={styles.logo3} />
          <img src="/assets/images/logos/logo-4.png" alt="logo" className={styles.logo2} />
        </div>
        {!role ? (
          <>
            <div className={styles.logLinks}>
              <a id="login-button-header" onClick={loginLink}>
                LOGIN
              </a>
              <a id="sign-up-button-header" onClick={singUpLink}>
                SIGN UP
              </a>
            </div>
          </>
        ) : (
          <>
            <DropDownMenu userData={userData} role={role} profileRoute={profileRoute} />
          </>
        )}
      </header>
    </>
  );
}

export default Header;
