import styles from './memberships.module.css';
import Container from 'Components/Shared/Container';
import { useSelector } from 'react-redux';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

const Memberships = () => {
  const member = useSelector((state) => state.auth?.user);
  const membership = member?.membership;

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div>
            <h1 className={styles.title}>MEMBERSHIPS</h1>
            <div className={styles.line}></div>
            <p className={styles.paragraph}>
              These are all the available memberships. If you want to try a different one please get
              in touch with your branch manager.
            </p>
          </div>
        </div>
        <div className={styles.cardContainer}>
          <div className={`${styles.card} ${styles.card1}`}>
            <h2>ONLY CLASSES</h2>
            <h3>$2500</h3>
            <hr />
            <div className={styles.listDiv}>
              <ul>
                <li>Free access to classes with prior registration.</li>
                <li>View grid is allowed.</li>
              </ul>
            </div>
          </div>
          <div className={`${styles.card} ${styles.card2}`}>
            {!membership && (
              <div className={styles.upgradeStar}>
                <KeyboardDoubleArrowUpIcon className={styles.upgradeStarIcon} />
                <p>upgrade</p>
              </div>
            )}
            {membership === 'Only Classes' && (
              <div className={styles.upgradeStar}>
                <KeyboardDoubleArrowUpIcon className={styles.upgradeStarIcon} />
                <p>upgrade</p>
              </div>
            )}
            <h2>CLASSIC</h2>
            <h3>$4000</h3>
            <hr />
            <div className={styles.listDiv}>
              <ul>
                <li>View grid is allowed.</li>
                <li>Free access to the weight room.</li>
                <li>Personalized monitoring by a coach.</li>
              </ul>
            </div>
          </div>
          <div className={`${styles.card} ${styles.card3}`}>
            {membership === 'Classic' && (
              <div className={styles.upgradeStar}>
                <KeyboardDoubleArrowUpIcon className={styles.upgradeStarIcon} />
                <p>upgrade</p>
              </div>
            )}
            <h2>BLACK</h2>
            <h3>$6000</h3>
            <hr />
            <div className={styles.listDiv}>
              <ul>
                <li>Free access to classes with prior registration.</li>
                <li>View grid is allowed.</li>
                <li>Free access to the weight room.</li>
                <li>Personalized monitoring by a coach.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Memberships;
