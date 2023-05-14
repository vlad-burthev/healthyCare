import { useEffect, useState } from "react";
import styles from "./ChangeInfoMed.module.scss";
import { MyInput } from "../../UI/MyInput/MyInput";
import axios from "axios";
import ErrorForm from "../../UI/ErrorForm/ErrorForm";

const ChangeInfoMed = ({ patient, setPatient, setShowForm, showForm }) => {
  const [showError, setShowError] = useState(false);
  const [newUser, setNewUser] = useState({});

  useEffect(() => {
    setNewUser({
      name: patient.name,
      number: patient.number,
      manufacturer: patient.manufacturer,
      photo: patient.photo,
      description: patient.description,
      id: patient.id,
    });
  }, []);

  const changePatient = async () => {
    setNewUser({
      name: newUser.name,
      number: newUser.number,
      manufacturer: newUser.manufacturer,
      photo: newUser.photo,
      description: newUser.description,
      id: patient.id,
    });

    if (
      newUser.name.lenght === 0 &&
      newUser.number.lenght === 0 &&
      newUser.description.lenght === 0 &&
      newUser.manufacturer.lenght === 0
    ) {
      setShowError(true);
    } else {
      setPatient(newUser);
      axios
        .put(`http://localhost:3000/medicaments/${patient.id}`, newUser) // Исправлено: использовать patient.id
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      setShowForm(false);
    }
  };

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
              placeholder="Введіть назву *"
            />
          </div>
          <div>
            <MyInput
              type="number"
              defaultValue={patient.number}
              onChange={(e) =>
                setNewUser({ ...newUser, number: e.target.value })
              }
              placeholder="Введіть кількість *"
            />
          </div>

          <div>
            <MyInput
              type="text"
              defaultValue={patient.manufacturer}
              onChange={(e) =>
                setNewUser({ ...newUser, manufacturer: e.target.value })
              }
              placeholder="Введіть виробника *"
            />
          </div>
          <div>
            <MyInput
              type="text"
              defaultValue={patient.description}
              onChange={(e) =>
                setNewUser({ ...newUser, description: e.target.value })
              }
              placeholder="Введіть введіть опис*"
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

          <button
            className={styles["add-form__btn"]}
            onClick={() => changePatient(patient.id)}
          >
            Оновити інформацію
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeInfoMed;
