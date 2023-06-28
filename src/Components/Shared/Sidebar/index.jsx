import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './sidebar.module.css';

const Sidebar = ({ routes }) => {
  return (
    <>
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
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
