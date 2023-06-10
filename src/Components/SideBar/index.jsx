import React from 'react';
import styles from './sideBar.module.css';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
    <aside>
      <nav className={styles.navbar}>
        <ul className={styles.rutes}>
          <li>
            {' '}
            <NavLink activeClassName={styles.active} exact to="/">
              Home
            </NavLink>{' '}
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/activities">
              Activities
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/admins">
              Admins
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/classes">
              Classes
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/members">
              Members
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/subscriptions">
              Subscriptions
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/super-admins">
              Super Admins
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/trainers">
              Trainers
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
