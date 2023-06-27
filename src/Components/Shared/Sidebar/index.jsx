import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './sidebar.module.css';
import SharedModal from 'Components/Shared/Modal/index';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'Redux/auth/thunks';
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { setUserRole } from 'Redux/auth/actions';

const Sidebar = ({ routes }) => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [bodyModal, setBodyModal] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const role = useSelector((state) => state.auth?.payload.role);
  console.log(role);
  const showSidebar = role !== '';

  const showModalLogout = () => {
    setTitleModal('Warning:');
    setBodyModal('Are you sure you want to log out?');
    setShowModal(true);
  };

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(setUserRole(''));
    setShowModal(false);
    history.push('/auth/login');
  };

  return (
    <>
      {showSidebar && (
        <aside className={styles.aside}>
          <nav className={styles.navbar}>
            <ul className={styles.routes}>
              {routes.map((route, index) => (
                <li key={index}>
                  <NavLink to={route.link} activeClassName={styles.active}>
                    {route.name}
                  </NavLink>
                </li>
              ))}
              <li onClick={showModalLogout}> Log Out</li>
            </ul>
          </nav>
        </aside>
      )}
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
};

export default Sidebar;
