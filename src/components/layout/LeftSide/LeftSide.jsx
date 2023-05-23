import { Link, useLocation } from "react-router-dom";
import styles from "./LeftSide.module.scss";
import { useState } from "react";
import img from "../../../img/logo_460x.avif";
import { useSelector } from "react-redux";

const LeftSide = () => {
  const patient = useSelector((state) => state.repos.patient);
  const patientID = useSelector((state) => state.repos.id);
  const doctorLogin = useSelector((state) => state.repos.doctor);
  const personalLogin = useSelector((state) => state.repos.personal);
  const registerLogin = useSelector((state) => state.repos.register);
  const location = useLocation();
  const value = localStorage.getItem("myKey");

  const isHomeActive = location.pathname === "/main/home";
  const isPatientsActive = location.pathname === "/main/patients";
  const isPatientsPage = location.pathname === `/main/patients/${value}`;
  const isPersonalPage = location.pathname === `/main/personal/${value}`;
  const isDoctorsActive = location.pathname === "/main/doctors";
  const isDoctorsPage = location.pathname === `/main/doctors/${value}`;
  const isRecordsActive = location.pathname === "/main/records";
  const isMedicamentsActive = location.pathname === "/main/medicaments";
  const isPersonalActive = location.pathname === "/main/personal";

  const [isLeftSideShown, setIsLeftSideShown] = useState(true);

  const toggleLeftSide = () => {
    setIsLeftSideShown(!isLeftSideShown);
  };
  return (
    <div
      className={`${styles.leftside} ${
        isLeftSideShown ? styles.showLeftSide : ""
      }`}
    >
      <button className={styles["toggle-button"]} onClick={toggleLeftSide}>
        {isLeftSideShown ? "close" : "open"}
      </button>
      <div className={styles["leftside-content"]}>
        <h3 className={styles["leftside-logo"]}>
          <img src={img} alt="" />
        </h3>
        {registerLogin && (
          <Link
            className={`${styles["leftside-link"]} ${
              isHomeActive ? styles.active : ""
            }`}
            to="home"
          >
            Головна
          </Link>
        )}

        {doctorLogin.doctor && (
          <Link
            className={`${styles["leftside-link"]} ${
              isDoctorsPage ? styles.active : ""
            }`}
            to={`doctors/${value}`}
          >
            Моя картка
          </Link>
        )}

        {personalLogin.personal && (
          <Link
            className={`${styles["leftside-link"]} ${
              isPersonalPage ? styles.active : ""
            }`}
            to={`personal/${value}`}
          >
            Моя картка
          </Link>
        )}

        {patient ? (
          <Link
            className={`${styles["leftside-link"]} ${
              isPatientsPage ? styles.active : ""
            }`}
            to={`patients/${value}`}
          >
            Моя картка
          </Link>
        ) : (
          <Link
            className={`${styles["leftside-link"]} ${
              isPatientsActive ? styles.active : ""
            }`}
            to="patients"
          >
            Пацієнти
          </Link>
        )}

        <Link
          className={`${styles["leftside-link"]} ${
            isDoctorsActive ? styles.active : ""
          }`}
          to="doctors"
        >
          Лікарі
        </Link>

        {!patient && (
          <Link
            className={`${styles["leftside-link"]} ${
              isRecordsActive ? styles.active : ""
            }`}
            to="records"
          >
            Записи
          </Link>
        )}
        <Link
          className={`${styles["leftside-link"]} ${
            isMedicamentsActive ? styles.active : ""
          }`}
          to="medicaments"
        >
          Медикоменти
        </Link>
        <Link
          className={`${styles["leftside-link"]} ${
            isPersonalActive ? styles.active : ""
          }`}
          to="personal"
        >
          Мед. працівники
        </Link>
        <div className={styles["register-tel"]}>
          <a href="tel:+380662312312">Реєстратор +380662312312</a>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
