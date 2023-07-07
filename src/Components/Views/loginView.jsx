import styles from 'Components/Layout/layout.module.css';
import Routes from 'Routes/Routes';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import Logo from 'assets/logo512.png';

const LoginView = () => {
  const chatMessage = 'Hola, qué tal? 🤝\nCómo podemos ayudarte?';

  return (
    <>
      <div className={styles.body}>
        <Routes />
      </div>
      <FloatingWhatsApp
        phoneNumber="+59899548345"
        accountName="Mega Rocket Gym"
        avatar={Logo}
        statusMessage="Atención al cliente"
        placeholder="Escribe un mensaje"
        chatMessage={chatMessage}
        allowClickAway="true"
        darkMode="true"
      />
    </>
  );
};

export default LoginView;
