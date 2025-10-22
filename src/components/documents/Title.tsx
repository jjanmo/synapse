import styles from '@/components/documents/Title.module.css';

const Title = () => {
  return (
    <div className={styles.container}>
      {/* @TODO 전체 화면에서 왔다갔다하도록 하는 로고를 추가할 예정 */}
      {/* <div className={styles.logoWrapper}>
        <Image src="/logo.png" width={80} height={80} className={styles.logo} alt="Synapse Logo" />
      </div> */}
      <h1 className={styles.title}>MDN Documents</h1>
      <h2 className={styles.subtitle}>Web APIs</h2>
    </div>
  );
};

export default Title;
