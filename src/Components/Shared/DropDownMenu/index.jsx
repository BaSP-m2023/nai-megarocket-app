import React, { useState, useEffect, useRef } from 'react';
import { logout } from 'Redux/auth/thunks';
import SharedModal from 'Components/Shared/Modal/index';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './dropDownMenu.moule.css';

const DropDownMenu = ({ userData, role }) => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [bodyModal, setBodyModal] = useState('');
  const dispatch = useDispatch();
  const menuRef = useRef();
  const history = useHistory();

  const userIcon = `${process.env.PUBLIC_URL}/assets/images/dropDownMenu/user.png`;
  const userPicture = `${process.env.PUBLIC_URL}/assets/images/dropDownMenu/userPicture.png`;
  const editIcon = `${process.env.PUBLIC_URL}/assets/images/dropDownMenu/edit.png`;
  const inboxIcon = `${process.env.PUBLIC_URL}/assets/images/dropDownMenu/envelope.png`;
  const settingsIcon = `${process.env.PUBLIC_URL}/assets/images/dropDownMenu/settings.png`;
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

  const DropdownItem = (props) => {
    return (
      <li className="dropdownItem" onClick={props.onClick}>
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
          <img src={userPicture}></img>
        </div>

        <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
          <p className="user-name">Name: {userData?.firstName}</p>
          <p className="user-role">Role: {role}</p>
          <ul>
            <DropdownItem img={userIcon} text={'My Profile'} />
            <DropdownItem img={editIcon} text={'Edit Profile'} />
            <DropdownItem img={inboxIcon} text={'Inbox'} />
            <DropdownItem img={settingsIcon} text={'Settings'} />
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
