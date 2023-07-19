import React, { useState, useEffect, useRef } from 'react';
import { logout } from 'Redux/auth/thunks';
import ConfirmModal from '../../Modal/ConfirmModal';
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
  const [color, setColor] = useState('');

  useEffect(() => {
    generateColor();
    const handler = (e) => {
      if (!menuRef?.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  const generateColor = () => {
    setColor(Math.random().toString(16).substr(-6));
  };

  const showModalLogout = () => {
    setOpen(!open);
    setTitleModal('Logout');
    setBodyModal('You want to leave?');
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

  function stringAvatar(name) {
    return {
      sx: {
        width: 50,
        height: 50,
        color: 'white'
      },
      children: (
        <Typography variant="h2" sx={{ fontSize: 16 }}>
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
            <Avatar
              id="header-button-avatar"
              {...stringAvatar(`${userData?.firstName} ${userData?.lastName}`)}
              sx={{
                height: '45px',
                width: '45px',
                marginRight: '60px',
                cursor: 'pointer',
                backgroundColor: '#' + color,
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: '#c5c5c5',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                }
              }}
            />
          </div>

          <div id="dropdown-menu" className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
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
          <ConfirmModal
            open={showModal}
            onClose={() => setShowModal(false)}
            isDelete={false}
            title={titleModal}
            body={bodyModal}
            onConfirm={handleLogOut}
            id="logout-modal"
            confirmId={'logout-button-confirm-modal'}
            closeId={'logout-button-close-modal'}
          />
        )}
      </div>
    </>
  );
};

export default DropDownMenu;
