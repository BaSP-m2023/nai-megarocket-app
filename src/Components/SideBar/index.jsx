import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'Redux/auth/thunks';
import SharedModal from 'Components/Shared/Modal/index';

const SideBar = () => {
  const [role, setRole] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [typeStyle] = useState('');
  const [titleModal] = useState('');
  const [bodyModal] = useState('');
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    setShowModal(false);
  };

  return (
    <>
      <aside>
        <nav>
          <ul>
            {!role && (
              <>
                <button onClick={() => setRole('super-admins')}>Super Admin</button>
                <button onClick={() => setRole('admins')}>Admin</button>
                <button onClick={() => setRole('members')}>Member</button>
              </>
            )}

            {role && (
              <>
                <li>
                  <NavLink active exact to="/" onClick={() => setRole()}>
                    Home
                  </NavLink>
                </li>
                {role === 'admins' && (
                  <>
                    <li>
                      <NavLink active to={`/${role}/profile`}>
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink active to={`/${role}/activities`}>
                        Activities
                      </NavLink>
                    </li>
                    <li>
                      <NavLink active to={`/${role}/classes`}>
                        Classes
                      </NavLink>
                    </li>
                    <li>
                      <NavLink active to={`/${role}/members`}>
                        Members
                      </NavLink>
                    </li>
                    <li>
                      <NavLink active to={`/${role}/subscriptions`}>
                        Subscriptions
                      </NavLink>
                    </li>
                    <li>
                      <NavLink active to={`/${role}/trainers`}>
                        Trainers
                      </NavLink>
                    </li>
                    <li>
                      <NavLink active to={`/${role}/reports`}>
                        Reports
                      </NavLink>
                    </li>
                  </>
                )}

                {role === 'super-admins' && (
                  <>
                    <li>
                      <NavLink active to={`/${role}/admins`}>
                        Admins
                      </NavLink>
                    </li>
                  </>
                )}

                {role === 'members' && (
                  <>
                    <li>
                      <NavLink active to={`/${role}/profile`}>
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink active to={`/${role}/schedule`}>
                        Schedule
                      </NavLink>
                    </li>
                    <li>
                      <NavLink active to={`/${role}/activities`}>
                        Activities
                      </NavLink>
                    </li>
                    <li>
                      <NavLink active to={`/${role}/memberships`}>
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
      {showModal && (
        <SharedModal
          show={showModal}
          typeStyle={typeStyle}
          title={titleModal}
          body={bodyModal}
          closeModal={handleLogOut}
          testId={'logout-modal'}
          closeTestId={'logout-button-close-success-modal'}
        />
      )}
    </>
  );
};

export default SideBar;
