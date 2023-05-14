import styles from "./MyInput.module.scss";

const MyInput = (props) => {
  return <input {...props} className={styles["my-input__text"]} />;
};

const MyInputRadio = (props) => {
  return <input {...props} className={styles["my-input__radio"]} />;
};

const MyTextArea = (props) => {
  return <textarea {...props} className={styles["my-teaxarea"]} />;
};

export { MyInput, MyInputRadio, MyTextArea };
