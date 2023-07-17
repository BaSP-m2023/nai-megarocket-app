import styles from './footer.module.css';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import RoomIcon from '@mui/icons-material/Room';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img src="/assets/images/logos/logo-4.png" alt="logo" />
          </div>
          <div className={styles.icons}>
            <a
              id="facebook-bar-link"
              href={'https://www.facebook.com/radiumrocket'}
              target={'_blank'}
              rel="noreferrer"
            >
              <FacebookRoundedIcon className={styles.socialIcon} />
            </a>
            <a
              id="twitter-bar-link"
              href={'https://twitter.com/radiumrocket'}
              target={'_blank'}
              rel="noreferrer"
            >
              <TwitterIcon className={styles.socialIcon} />
            </a>
            <a
              id="instagram-bar-link"
              href={'https://www.instagram.com/radium.rocket/'}
              target={'_blank'}
              rel="noreferrer"
            >
              <InstagramIcon className={styles.socialIcon} />
            </a>
          </div>
          <div className={styles.copyright}>
            <p>
              &copy;Megarocket. All rights reserved &nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp; Nai & Luchito
              team.
            </p>
          </div>
        </div>
        <div className={styles.contactData}>
          <h5>get in touch</h5>
          <a
            id="google-maps-bar-link"
            target="_blank"
            href="https://www.google.com/maps/place/C%C3%B3rdoba+2535,+S2000KZG+Rosario,+Santa+Fe/@-32.9429766,-60.6601152,17z/data=!4m5!3m4!1s0x95b7ab440630e631:0x1c43ee24c6347f71!8m2!3d-32.9431072!4d-60.6579802?entry=ttu"
            rel="noreferrer"
          >
            <RoomIcon />
            &nbsp;Cordoba 2535 - Rosario
          </a>
          <a id="phone-number-bar-link" href="tel:+543471616394" target="_blank" rel="noreferrer">
            <LocalPhoneIcon />
            &nbsp;341 - 0303456
          </a>
          <a id="mail-bar-link" target="_blank" href="mailto:dbninfi@gmail.com" rel="noreferrer">
            <EmailIcon /> &nbsp;contact@megarocket.com
          </a>
          <p>
            <ScheduleIcon />
            &nbsp;Mon-Sat | 8AM-10PM
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
