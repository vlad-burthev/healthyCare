import { useEffect, useState } from "react";
import styles from "./ChangeInfoForm.module.scss";
import { MyInput, MyTextArea } from "../../UI/MyInput/MyInput";
import axios from "axios";
import ErrorForm from "../../UI/ErrorForm/ErrorForm";

const ChangeInfoForm = ({
  patient,
  setPatient,
  setShowForm,
  userHistory,
  userInformation,
  userAddres,
  userAPI,
  userDisease,
}) => {
  const [showError, setShowError] = useState(false);
  const [newUser, setNewUser] = useState({});

  useEffect(() => {
    setNewUser({
      login: patient.login,
      pass: patient.pass,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      address: patient.address,
      history: patient.history,
      photo: patient.photo,
      procedures: patient.procedures,
      disease: patient.disease,
      id: patient.id,
    });
  }, []);

  const changePatient = async () => {
    setNewUser({
      name: newUser.name,
      age: newUser.age,
      gender: newUser.gender,
      phone: newUser.phone,
      email: newUser.email,
      address: newUser.address,
      history: newUser.history,
      photo: newUser.photo,
      procedures: newUser.procedures,
      disease: newUser.disease,
      id: patient.id,
    });

    if (
      newUser.name.length === 0 ||
      newUser.age.length === 0 ||
      newUser.phone.length === 0 ||
      newUser.email.length === 0
    ) {
      setShowError(true);
    } else {
      setPatient(newUser);
      axios
        .put(`http://localhost:3000/${userAPI}/${patient.id}`, newUser)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      setShowForm(false);
    }
  };

  function handleKeyPress(event) {
    if (event.key === "e") {
      event.preventDefault();
    }
  }

  return (
    <div className={styles["add-info__bg"]} onClick={() => setShowForm(false)}>
      <div
        className={styles["add-info__content"]}
        onClick={(e) => e.stopPropagation()}
      >
        {showError && <ErrorForm setShowError={setShowError} />}
        <div className={styles["add-info__form"]}>
          <div>
            <MyInput
              type="text"
              defaultValue={patient.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Введіть ПІБ *"
            />
          </div>
          <div>
            <MyInput
              type="text"
              defaultValue={patient.age}
              onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
              placeholder="Введіть вік *"
            />
          </div>

          <div>
            <MyInput
              type="number"
              defaultValue={patient.phone}
              onKeyPress={handleKeyPress}
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
              placeholder="Введіть номер телефону *"
            />
          </div>
          <div>
            <MyInput
              type="text"
              defaultValue={patient.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              placeholder="Введіть Email *"
            />
          </div>
          <div>
            <MyInput
              type="text"
              defaultValue={patient.photo}
              onChange={(e) =>
                setNewUser({ ...newUser, photo: e.target.value })
              }
              placeholder="Введіть URL зображення"
            />
          </div>
          <div>
            <MyInput
              type="text"
              defaultValue={patient.address}
              onChange={(e) =>
                setNewUser({ ...newUser, address: e.target.value })
              }
              placeholder={userAddres}
            />
          </div>
          <div>
            <MyTextArea
              placeholder={userDisease}
              defaultValue={patient.disease}
              onChange={(e) =>
                setNewUser({ ...newUser, disease: e.target.value })
              }
            />
          </div>
          <div>
            <MyTextArea
              placeholder={userHistory}
              defaultValue={patient.history}
              onChange={(e) =>
                setNewUser({ ...newUser, history: e.target.value })
              }
            />
          </div>
          <div>
            <MyTextArea
              placeholder={userInformation}
              defaultValue={patient.procedures}
              onChange={(e) =>
                setNewUser({ ...newUser, procedures: e.target.value })
              }
            />
          </div>
          <button className={styles["add-form__btn"]} onClick={changePatient}>
            Оновити інформацію
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeInfoForm;
