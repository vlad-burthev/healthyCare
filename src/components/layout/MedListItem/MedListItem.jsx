import { useEffect, useState } from "react";
import DelateBtn from "../../UI/DelateBtn/DelateBtn";
import ChangeInfoMed from "../ChangeInfoMed/ChangeInfoMed";
import styles from "./MedListItem.module.scss";
import axios from "axios";
import { useSelector } from "react-redux";

const MedListItem = ({ userMed, delateUser }) => {
  const registerLogin = useSelector((state) => state.repos.register);

  const [user, setUser] = useState({});
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    setUser(userMed);
  }, []);

  return (
    <div className={styles["user-list__item"]}>
      <div className={styles["user-list__item-id"]}>{user.id}</div>

      <div
        style={{ display: "blcok" }}
        className={styles["user-list__content"]}
      >
        <div className={styles["user-list__info"]}>
          <p>
            Назва: <span>{user.name}</span>{" "}
          </p>
          <p>
            Кільскість: <span>{user.number}</span>{" "}
          </p>
          <p>
            Виробник: <span>{user.manufacturer}</span>
          </p>
          <div>
            Описання:
            <span className={styles.description}>{user.description}</span>
          </div>
        </div>
        <div
          className={styles["user-list__photo"]}
          style={{
            border: "2px solid #4b7e52",
            borderRadius: "50%",
            width: "250px",
            height: "250px",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundImage: `url(${user.photo ? user.photo : ""})`,
          }}
        ></div>
      </div>
      {registerLogin && (
        <DelateBtn
          className={styles["user-list__btn-delate"]}
          onClick={() => delateUser(user.id)}
        >
          Видалити
        </DelateBtn>
      )}
      {registerLogin && (
        <button
          className={styles["user-list__btn-update"]}
          onClick={() => setShowForm(true)}
        >
          Оновити інформацію
        </button>
      )}
      {showForm && (
        <ChangeInfoMed
          setShowForm={setShowForm}
          patient={user}
          setPatient={setUser}
          showForm={showForm}
        />
      )}
    </div>
  );
};

export default MedListItem;
