import styles from './header.module.css';

function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.brand}>MEGAROCKET</div>
      <div className={styles.icons}>
        <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
          <img
            className={styles.socialIcon}
            src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
          />
        </a>
        <a href={'https://twitter.com/radiumrocket'} target={'_blank'} rel="noreferrer">
          <img
            className={styles.socialIcon}
            src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
          />
        </a>
        <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
          <img
            className={styles.socialIcon}
            src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
          />
        </a>
      </div>
    </header>
  );
}

export default Header;
