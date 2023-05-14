import styles from "./AddBtn.module.scss";

const AddBtn = (props) => {
  return (
    <button {...props} className={`${styles["btn-add"]}  ${props.className}`}>
      {props.children}
    </button>
  );
};

export default AddBtn;
