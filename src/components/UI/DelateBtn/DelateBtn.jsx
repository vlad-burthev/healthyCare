import styles from "./DelateBtn.module.scss";

const DelateBtn = (props) => {
  return (
    <button
      {...props}
      className={`${styles["delate-btn"]}  ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default DelateBtn;
