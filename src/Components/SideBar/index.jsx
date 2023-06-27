// import React, { useEffect, useState } from 'react';
import React from 'react';
import styles from './sideBar.module.css';
import { NavLink } from 'react-router-dom';

const SideBar = ({ initialRole }) => {
  console.log('this is my initial role', initialRole);
  // const activeRole = sessionStorage.getItem('role');

  // const [refreshSideBar, setRefreshSideBar] = useState('');

  // useEffect(() => {
  //   setRefreshSideBar(activeRole);
  // }, []);

  return (
    <aside className={styles.aside}>
      <nav className={styles.navbar}>
        <ul className={styles.routes}>
          {!initialRole && (
            <>
              <button className={styles.button}>Log In</button>
              <button className={styles.button}>Sign Up</button>
            </>
          )}
          {initialRole && (
            <>
              <li>
                <NavLink activeClassName={styles.active} exact to="/">
                  Home
                </NavLink>
              </li>
              {initialRole === 'ADMIN' && (
                <>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/admin/profile`}>
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/admin/activities`}>
                      Activities
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/admin/classes`}>
                      Classes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/admin/members`}>
                      Members
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/admin/subscriptions`}>
                      Subscriptions
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/admin/trainers`}>
                      Trainers
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/admin/reports`}>
                      Reports
                    </NavLink>
                  </li>
                </>
              )}

              {initialRole === 'SUPER_ADMIN' && (
                <>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/super-admins/admins`}>
                      Admins
                    </NavLink>
                  </li>
                </>
              )}

              {initialRole === 'MEMBER' && (
                <>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/members/profile`}>
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/members/schedule`}>
                      Schedule
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/members/activities`}>
                      Activities
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName={styles.active} to={`/members/memberships`}>
                      Memberships
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
