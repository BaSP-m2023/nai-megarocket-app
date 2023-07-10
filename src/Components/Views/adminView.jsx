import Header from 'Components/Header/index';
import styles from 'Components/Layout/layout.module.css';
import Routes from 'Routes/Routes';
import Sidebar from 'Components/Shared/Sidebar';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import Logo from 'assets/logo512.png';

const AdminView = () => {
  const routes = [
    { name: 'Home', link: '/admins/home' },
    { name: 'Profile', link: '/admins/profile' },
    { name: 'Activities', link: '/admins/activities' },
    { name: 'Classes', link: '/admins/classes' },
    { name: 'Members', link: '/admins/members' },
    { name: 'Trainers', link: '/admins/trainers' },
    { name: 'Subscriptions', link: '/admins/subscriptions' },
    { name: 'Reports', link: '/admins/reports' }
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

export default AdminView;
