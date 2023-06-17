import React, { useState } from 'react';
import styles from './sideBar.module.css';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  const [rol, setRole] = useState();
  console.log(rol);

  return (
    <aside>
      <nav className={styles.navbar}>
        <ul className={styles.rutes}>
          {!rol && (
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

          {rol && (
            <>
              <li>
                <NavLink activeClassName={styles.active} exact to="/" onClick={() => setRole()}>
                  Home
                </NavLink>
              </li>
              {rol === 'admin' && (
                <>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${rol}/activities`}>
                      Activities
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${rol}/admins`}>
                      Admins
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${rol}/classes`}>
                      Classes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${rol}/members`}>
                      Members
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${rol}/subscriptions`}>
                      Subscriptions
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${rol}/trainers`}>
                      Trainers
                    </NavLink>
                  </li>
                </>
              )}

              {rol === 'super-admin' && (
                <>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${rol}/admins`}>
                      Admins
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${rol}/super-admins`}>
                      Super Admins
                    </NavLink>
                  </li>
                </>
              )}

              {rol === 'member' && (
                <>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${rol}/activities`}>
                      Activities
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${rol}/profile`}>
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${rol}/memberships`}>
                      Memberships
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/${rol}/schedule`}>
                      Schedule
                    </NavLink>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
