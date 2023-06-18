import React, { useState } from 'react';
import styles from './memberships.module.css';

const Memberships = () => {
  const [memberType, setMemberType] = useState();

  return (
    <>
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
            {!memberType && (
              <>
                <div className={styles.upgradeStar}>Upgrade</div>
              </>
            )}
            {memberType === 'only-clases' && (
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
            {memberType === 'classic' && (
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
      <div className={styles.containerMemberList}>
        <div className={styles.memberListDiv}>
          <p className={styles.textSelect}>
            <b>Choose type of member to change promo in cards:</b>{' '}
          </p>
          <ul>
            <button className={styles.button} onClick={() => setMemberType('only-clases')}>
              Only Clases
            </button>
            <button className={styles.button} onClick={() => setMemberType('classic')}>
              Classic
            </button>
            <button className={styles.button} onClick={() => setMemberType('black')}>
              Black
            </button>
            <button className={styles.button} onClick={() => setMemberType(false)}>
              No active membership
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Memberships;
