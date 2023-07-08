import Header from 'Components/Header/index';
import styles from 'Components/Layout/layout.module.css';
import Routes from 'Routes/Routes';
import Sidebar from 'Components/Shared/Sidebar';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import Logo from 'assets/logo512.png';

const SuperAdminView = () => {
  const routes = [
    { name: 'Home', link: '/super-admins/home' },
    { name: 'Admins', link: '/super-admins/admins' }
  ];
  const chatMessage = 'Hello there! 🤝 \nHow can we help?';
  return (
    <>
      <Header />
      <div className={styles.body}>
        <Sidebar routes={routes} />
        <Routes />
      </div>
      <FloatingWhatsApp
        phoneNumber="+59899548345"
        accountName="Mega Rocket Gym"
        avatar={Logo}
        statusMessage="Customer service"
        placeholder="Type a message.."
        chatMessage={chatMessage}
        allowClickAway="true"
        darkMode="true"
      />
    </>
  );
};

export default SuperAdminView;
