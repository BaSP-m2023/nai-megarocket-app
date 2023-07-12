import styles from './memberships.module.css';
import Container from 'Components/Shared/Container';
import { useSelector } from 'react-redux';

const Memberships = () => {
  const member = useSelector((state) => state.auth?.user);
  const membership = member?.membership;

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.header}>
            <h1 className={styles.title}>MEMBERSHIPS</h1>
            <div className={styles.line}></div>
            <p className={styles.paragraph}>
              These are all the available memberships. If you want to try a different one please get
              in touch with your branch manager.
            </p>
          </div>
        </div>
        <div className={styles.cardContainer}>
          <div className={`${styles.card1} ${styles.card}`}>
            <h3>ONLY CLASSES</h3>
            <h2>$2500</h2>
            <hr />
            <div className={styles.listDiv}>
              <ul>
                <li>Free access to classes with prior registration.</li>
                <li>View grid is allowed.</li>
              </ul>
            </div>
          </div>
          <div className={`${styles.card2} ${styles.card}`}>
            {!membership && (
              <>
                <div className={styles.upgradeStar}>Upgrade</div>
              </>
            )}
            {membership === 'Only Classes' && (
              <>
                <div className={styles.upgradeStar}>Upgrade</div>
              </>
            )}
            <h3>CLASSIC</h3>
            <h2>$4000</h2>
            <hr />
            <div className={styles.listDiv}>
              <ul>
                <li>View grid is allowed.</li>
                <li>Free access to the weight room.</li>
                <li>Personalized monitoring by a coach.</li>
              </ul>
            </div>
          </div>
          <div className={`${styles.card3} ${styles.card}`}>
            {membership === 'Classic' && (
              <>
                <div className={styles.upgradeStar}>Upgrade</div>
              </>
            )}
            <h3>BLACK</h3>
            <h2>$6000</h2>
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
