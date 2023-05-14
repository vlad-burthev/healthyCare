import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.segment}></div>
      <div className={styles.segment}></div>
      <div className={styles.segment}></div>
      <div className={styles.segment}></div>
      <div className={styles.segment}></div>
      <div className={styles.segment}></div>
      <div className={styles.segment}></div>
      <div className={styles.segment}></div>
    </div>
  );
};

export default Loader;
