import styles from './footer.module.css';

function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.brand}>
          <h2>megarocket</h2>
          <div className={styles.icons}>
            <a
              id="facebook-bar-link"
              href={'https://www.facebook.com/radiumrocket'}
              target={'_blank'}
              rel="noreferrer"
            >
              <img
                className={styles.socialIcon}
                src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
              />
            </a>
            <a
              id="twitter-bar-link"
              href={'https://twitter.com/radiumrocket'}
              target={'_blank'}
              rel="noreferrer"
            >
              <img
                className={styles.socialIcon}
                src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
              />
            </a>
            <a
              id="instagram-bar-link"
              href={'https://www.instagram.com/radium.rocket/'}
              target={'_blank'}
              rel="noreferrer"
            >
              <img
                className={styles.socialIcon}
                src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
              />
            </a>
          </div>
          <div className={styles.copyright}>
            <p>&copy;Megarocket. All rigths reserved || Nai & Luchito team.</p>
          </div>
        </div>
        <div className={styles.contactData}>
          <h5>get in touch</h5>
          <p>Cordoba 2535 - Rosario</p>
          <p>341 - 0303456</p>
          <p>contact@megarocket.com</p>
          <p>Mon-Sat | 8AM-10PM</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
