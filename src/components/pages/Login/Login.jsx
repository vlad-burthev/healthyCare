import { useState } from "react";
import Container from "../../UI/Container/Container";
import styles from "./Login.module.scss";
import LoginPage from "../../layout/LoginPage/LoginPage";
import RegForm from "../../layout/RegForm/RegForm";

const Login = () => {
  const signList = [
    {
      patient: { api: "patients", name: "Пацієнт" },
      docotr: { api: "doctors", name: "Лікар" },
      personal: { api: "personal", name: "Мед. працівник" },
      users: { api: "users", name: "Реєстратор" },
    },
  ];

  const [toggleSign, setToggleSign] = useState({
    state: true,
    login: "Авторизуватись",
    reg: "Зареєструватись",
  });

  return (
    <div className={styles["signPage"]}>
      <Container>
        <div className={styles["signPage-content"]}>
          <div
            className={`${styles["signPage-close"]} ${
              toggleSign.state ? styles["signPage-close__login"] : ""
            }`}
          >
            <button
              className={`${styles["signPage-close__btn"]} `}
              onClick={() =>
                setToggleSign({ ...toggleSign, state: !toggleSign.state })
              }
            >
              {!toggleSign.state ? toggleSign.login : toggleSign.reg}
            </button>
          </div>
          <LoginPage signList={signList} />
          <RegForm signList={signList} />
        </div>
      </Container>
    </div>
  );
};

export default Login;
