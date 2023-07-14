import React, { useState, useEffect, useRef } from 'react';
import { logout } from 'Redux/auth/thunks';
import SharedModal from 'Components/Shared/Modal/index';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Avatar from '@mui/material/Avatar';
import './dropDownMenu.moule.css';
import Typography from '@mui/material/Typography';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const DropDownMenu = ({ userData, role, profileRoute }) => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [bodyModal, setBodyModal] = useState('');
  const dispatch = useDispatch();
  const menuRef = useRef();
  const history = useHistory();

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

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        width: 65,
        height: 65,
        bgcolor: stringToColor(name)
      },
      children: (
        <Typography variant="h1" sx={{ fontSize: 23 }}>
          {`${name.split(' ')[0][0]}${name.split(' ')[1][0]}`}
        </Typography>
      )
    };
  }
  const DropdownItem = (props) => {
    const idString = props.text.toLowerCase().replace(/\s+/g, '-');
    return (
      <li id={`${idString}-button-drop-down-menu`} className="dropdownItem" onClick={props.onClick}>
        <div>{props.img}</div>
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
          <div className="avatar">
            <Avatar {...stringAvatar(`${userData?.firstName} ${userData?.lastName}`)} />
          </div>
        </div>

        <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
          <p className="user-name">
            {' '}
            {userData?.firstName} {userData?.lastName}
          </p>
          <p className="user-role">{role}</p>
          <ul>
            {profileRoute && (
              <DropdownItem
                img={<PermIdentityOutlinedIcon style={{ color: 'grey' }} />}
                text={'My Profile'}
                onClick={sendToProfile}
              />
            )}
            <DropdownItem
              img={<ContactSupportOutlinedIcon style={{ color: 'grey' }} />}
              text={'Chat Support'}
              onClick={sendWhatsapp}
            />
            <DropdownItem
              img={<LogoutOutlinedIcon style={{ color: 'grey' }} />}
              text={'Logout'}
              onClick={showModalLogout}
            />
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
