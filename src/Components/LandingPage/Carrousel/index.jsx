import { useEffect, useState } from 'react';
import styles from './carrousel.module.css';

const Carrousel = () => {
  const [isYogaHovered, setIsYogaHovered] = useState(false);
  const [isBuildHovered, setIsBuildHovered] = useState(false);
  const [isRunningHovered, setIsRunningHovered] = useState(false);
  const [defaultBackground, setDefaultBackground] = useState('');
  const [lastHoveredBackground, setLastHoveredBackground] = useState('');

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 3);

    switch (randomNumber) {
      case 0:
        setDefaultBackground(styles.yogaContainer);
        break;
      case 1:
        setDefaultBackground(styles.buildContainer);
        break;
      case 2:
        setDefaultBackground(styles.runningContainer);
        break;
      default:
        setDefaultBackground('');
        break;
    }
  }, []);

  const handleMouseEnter = (type) => {
    if (type === 'yoga') {
      setIsYogaHovered(true);
      setIsBuildHovered(false);
      setIsRunningHovered(false);
    } else if (type === 'build') {
      setIsYogaHovered(false);
      setIsBuildHovered(true);
      setIsRunningHovered(false);
    } else if (type === 'running') {
      setIsYogaHovered(false);
      setIsBuildHovered(false);
      setIsRunningHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsYogaHovered(false);
    setIsBuildHovered(false);
    setIsRunningHovered(false);
  };

  useEffect(() => {
    if (isYogaHovered) {
      setLastHoveredBackground(styles.yogaContainer);
    } else if (isBuildHovered) {
      setLastHoveredBackground(styles.buildContainer);
    } else if (isRunningHovered) {
      setLastHoveredBackground(styles.runningContainer);
    }
  }, [isYogaHovered, isBuildHovered, isRunningHovered]);

  return (
    <div
      className={`${styles.container} ${defaultBackground ? defaultBackground : ''} ${
        isYogaHovered ? styles.yogaContainer : ''
      } ${isBuildHovered ? styles.buildContainer : ''} ${
        isRunningHovered ? styles.runningContainer : ''
      } ${lastHoveredBackground}`}
    >
      <div className={styles.icons}>
        <div
          className={`${styles.icon} ${styles.yoga}`}
          onMouseEnter={() => handleMouseEnter('yoga')}
          onMouseLeave={handleMouseLeave}
        >
          <h4>yoga</h4>
          <p>enjoy your life</p>
        </div>
        <div
          className={`${styles.icon} ${styles.build}`}
          onMouseEnter={() => handleMouseEnter('build')}
          onMouseLeave={handleMouseLeave}
        >
          <h4>build</h4>
          <p>release your beast</p>
        </div>
        <div
          className={`${styles.icon} ${styles.running}`}
          onMouseEnter={() => handleMouseEnter('running')}
          onMouseLeave={handleMouseLeave}
        >
          <h4>running</h4>
          <p>boost your body</p>
        </div>
      </div>
    </div>
  );
};

export default Carrousel;
