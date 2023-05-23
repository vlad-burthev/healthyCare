import { useState } from "react";
import styles from "./AddInfoMed.module.scss";
import { MyInput } from "../../UI/MyInput/MyInput";
import { MyTextArea } from "../../UI/MyInput/MyInput";
import AddBtn from "../../UI/AddBtn/AddBtn";
import ErrorForm from "../../UI/ErrorForm/ErrorForm";

const AddInfoMed = ({ setUser, user, api, setShowForm }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    number: "",
    manufacturer: "",
    description: "",
    photo: "",
    id: "",
  });

  const [showError, setShowError] = useState(false);

  const addPatient = () => {
    const newUser = {
      name: userInfo.name,
      number: userInfo.number,
      manufacturer: userInfo.manufacturer,
      photo: userInfo.photo,
      description: userInfo.description,
      id: Date.now(),
    };

    if (
      userInfo.name.length === 0 ||
      userInfo.number.length === 0 ||
      userInfo.manufacturer.length === 0 ||
      userInfo.description.length === 0 ||
      userInfo.photo.length === 0
    ) {
      return setShowError(true);
    } else {
      fetch(`http://localhost:3000/${api}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .catch((error) => console.log(error));
      setUser([...user, newUser]);
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
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
              placeholder="Введіть назву *"
            />
          </div>
          <div>
            <MyInput
              type="num"
              onKeyPress={handleKeyPress}
              onChange={(e) =>
                setUserInfo({ ...userInfo, number: e.target.value })
              }
              placeholder="Введіть кількість *"
            />
          </div>
          <div>
            <MyInput
              type="text"
              onChange={(e) =>
                setUserInfo({ ...userInfo, manufacturer: e.target.value })
              }
              placeholder="Введіть виробника *"
            />
          </div>
          <div>
            <MyInput
              type="text"
              onChange={(e) =>
                setUserInfo({ ...userInfo, photo: e.target.value })
              }
              placeholder="Введіть URL зображення *"
            />
          </div>
          <div>
            <MyTextArea
              onChange={(e) =>
                setUserInfo({ ...userInfo, description: e.target.value })
              }
              placeholder="Введіть опис товару *"
            />
          </div>
          <AddBtn className={styles["add-form__btn"]} onClick={addPatient}>
            Додати медикамент
          </AddBtn>
        </div>
      </div>
    </div>
  );
};

export default AddInfoMed;
