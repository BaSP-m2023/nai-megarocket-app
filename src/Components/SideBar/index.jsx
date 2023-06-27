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
        <ul className={styles.rutes}>
          {!role && (
            <>
              <button className={styles.button} onClick={() => setRole('super-admin')}>
                Super Admin
              </button>
              <button className={styles.button} onClick={() => setRole('admin')}>
                Admin
              </button>
              <button className={styles.button} onClick={() => setRole('member')}>
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
              {role === 'admin' && (
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

              {role === 'super-admin' && (
                <>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${role}/admins`}>
                      Admins
                    </NavLink>
                  </li>
                </>
              )}

              {role === 'member' && (
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
