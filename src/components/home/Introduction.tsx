import type { FC } from 'react';
import Image from 'next/image';
import styles from '@/styles/components/introduction.module.css';

const Introduction: FC = () => {
  return (
    <header className={styles.container}>
      <div className={styles.logoWrapper}>
        <Image src="/logo.png" width={80} height={80} className={styles.logo} alt="Synapse Logo" />
      </div>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Synapse</h1>
        <h2 className={styles.subtitle}>Web API</h2>
      </div>
    </header>
  );
};

export default Introduction;
