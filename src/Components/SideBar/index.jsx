import React, { useState } from 'react';
import styles from './sideBar.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'Redux/auth/thunks';

const SideBar = () => {
  const [role, setRole] = useState();

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <aside className={styles.aside}>
      <nav className={styles.navbar}>
        <ul className={styles.routes}>
          {!role && (
            <>
              <button className={styles.button} onClick={() => setRole('super-admins')}>
                Super Admin
              </button>
              <button className={styles.button} onClick={() => setRole('admins')}>
                Admin
              </button>
              <button className={styles.button} onClick={() => setRole('members')}>
                Member
              </button>
            </>
          )}

          {role && (
            <>
              <li>
                <NavLink activeClassName={styles.active} exact to="/" onClick={() => setRole()}>
                  Home
                </NavLink>
              </li>
              {role === 'admins' && (
                <>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${role}/profile`}>
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${role}/activities`}>
                      Activities
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${role}/classes`}>
                      Classes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${role}/members`}>
                      Members
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${role}/subscriptions`}>
                      Subscriptions
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${role}/trainers`}>
                      Trainers
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${role}/reports`}>
                      Reports
                    </NavLink>
                  </li>
                </>
              )}

              {role === 'super-admins' && (
                <>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${role}/admins`}>
                      Admins
                    </NavLink>
                  </li>
                </>
              )}

              {role === 'members' && (
                <>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${role}/profile`}>
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${role}/schedule`}>
                      Schedule
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${role}/activities`}>
                      Activities
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${role}/memberships`}>
                      Memberships
                    </NavLink>
                  </li>
                </>
              )}
            </>
          )}

          <li>
            <NavLink activeClassName={styles.active} to={`/auth/login`} onClick={handleLogOut}>
              Log Out
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
