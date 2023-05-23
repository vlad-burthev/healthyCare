import styles from "./ErrorForm.module.scss";

const ErrorForm = ({ setShowError }) => {
  return (
    <div className={styles["error-bg"]}>
      <div className={styles["error-form"]}>
        <h3>
          Необхідно заповнити всі поля із "<span>*</span>"
        </h3>
        <button onClick={() => setShowError(false)}>Закрити</button>
      </div>
    </div>
  );
};

export default ErrorForm;
