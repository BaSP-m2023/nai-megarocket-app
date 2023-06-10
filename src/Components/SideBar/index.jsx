import React from 'react';
import styles from './sideBar.module.css';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <aside>
      <nav className={styles.navbar}>
        <ul className={styles.rutes}>
          <li>
            {' '}
            <Link to="/">Home</Link>{' '}
          </li>
          <li>
            <Link to="/activities">Activities</Link>
          </li>
          <li>
            <Link to="/admins">Admins</Link>
          </li>
          <li>
            <Link to="/classes">Classes</Link>
          </li>
          <li>
            <Link to="/members">Members</Link>
          </li>
          <li>
            <Link to="/subscriptions">Subscriptions</Link>
          </li>
          <li>
            <Link to="/super-admins">Super Admins</Link>
          </li>
          <li>
            <Link to="/trainers">Trainers</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
