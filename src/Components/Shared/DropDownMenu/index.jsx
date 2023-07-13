import React, { useState, useEffect, useRef } from 'react';
import { logout } from 'Redux/auth/thunks';
import SharedModal from 'Components/Shared/Modal/index';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './dropDownMenu.moule.css';

const DropDownMenu = ({ userData, role, profileRoute }) => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [bodyModal, setBodyModal] = useState('');
  const dispatch = useDispatch();
  const menuRef = useRef();
  const history = useHistory();

  const userIcon = `${process.env.PUBLIC_URL}/assets/images/dropDownMenu/user.png`;
  const userPicture = `${process.env.PUBLIC_URL}/assets/images/dropDownMenu/userPicture.png`;
  const helpIcon = `${process.env.PUBLIC_URL}/assets/images/dropDownMenu/question.png`;
  const logoutIcon = `${process.env.PUBLIC_URL}/assets/images/dropDownMenu/log-out.png`;

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  const showModalLogout = () => {
    setTitleModal('Warning');
    setBodyModal('You want to log out?');
    setShowModal(true);
  };

  const sendWhatsapp = () => {
    window.open('https://wa.me/+59899548345', '_blank');
  };

  const handleLogOut = () => {
    dispatch(logout());
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('token');
    setShowModal(false);
    localStorage.setItem('toastMessage', 'See you soon!');
    history.push('/auth/login');
  };

  const sendToProfile = () => {
    history.push(profileRoute);
  };

  const DropdownItem = (props) => {
    const idString = props.text.toLowerCase().replace(/\s+/g, '-');
    return (
      <li id={`${idString}-button-drop-down-menu`} className="dropdownItem" onClick={props.onClick}>
        <img src={props.img}></img>
        <a> {props.text} </a>
      </li>
    );
  };

  return (
    <>
      <div className="menu-container" ref={menuRef}>
        <div
          className="menu-trigger"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <img id="user-avatar-button-drop-down-menu" src={userPicture}></img>
        </div>

        <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
          <p className="user-name">
            {' '}
            {userData?.firstName} {userData?.lastName}
          </p>
          <p className="user-role">{role}</p>
          <ul>
            {profileRoute && (
              <DropdownItem img={userIcon} text={'My Profile'} onClick={sendToProfile} />
            )}
            <DropdownItem img={helpIcon} text={'Chat Support'} onClick={sendWhatsapp} />
            <DropdownItem img={logoutIcon} text={'Logout'} onClick={showModalLogout} />
          </ul>
        </div>
      </div>

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

export default DropDownMenu;
