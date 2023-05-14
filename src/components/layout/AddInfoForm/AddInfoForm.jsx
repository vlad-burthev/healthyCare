import { useState } from "react";

import styles from "./AddInfoForm.module.scss";
import { MyInput, MyTextArea } from "../../UI/MyInput/MyInput";
import ErrorForm from "../../UI/ErrorForm/ErrorForm";
import AddBtn from "../../UI/AddBtn/AddBtn";

const AddInfoForm = ({
  setUser,
  user,
  api,
  setShowForm,
  userHistory,
  userInformation,
  addUser,
  desie,
  address,
}) => {
  const [userInfo, setUserInfo] = useState({
    login: "",
    pass: "",
    name: "",
    age: "",
    phone: "",
    email: "",
    address: "",
    procedures: "",
    disease: "",
    history: "",
    photo: "",
    recordHistory: [],
    id: "",
  });

  const [showError, setShowError] = useState(false);

  const addPatient = () => {
    const newUser = {
      login: userInfo.login,
      pass: userInfo.pass,
      name: userInfo.name,
      age: userInfo.age,
      phone: userInfo.phone,
      email: userInfo.email,
      address: userInfo.address,
      history: userInfo.history,
      photo: userInfo.photo,
      disease: userInfo.disease,
      procedures: userInfo.procedures,
      recordHistory: [],
      id: Date.now(),
    };

    if (
      userInfo.name.length === 0 ||
      userInfo.age.length === 0 ||
      userInfo.phone.length === 0 ||
      userInfo.email.length === 0
    ) {
      setShowError(true);
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
                setUserInfo({ ...userInfo, login: e.target.value })
              }
              placeholder="Введіть логін *"
            />
          </div>
          <div>
            <MyInput
              type="text"
              onChange={(e) =>
                setUserInfo({ ...userInfo, pass: e.target.value })
              }
              placeholder="Введіть пароль *"
            />
          </div>
          <div>
            <MyInput
              type="text"
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
              placeholder="Введіть ПІБ *"
            />
          </div>
          <div>
            <MyInput
              type="text"
              onChange={(e) =>
                setUserInfo({ ...userInfo, age: e.target.value })
              }
              placeholder="Введіть вік *"
            />
          </div>

          <div>
            <MyInput
              type="number"
              onKeyPress={handleKeyPress}
              onChange={(e) =>
                setUserInfo({ ...userInfo, phone: e.target.value })
              }
              placeholder="Введіть номер телефону *"
            />
          </div>
          <div>
            <MyInput
              type="text"
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              placeholder="Введіть Email *"
            />
          </div>
          <div>
            <MyInput
              type="text"
              onChange={(e) =>
                setUserInfo({ ...userInfo, photo: e.target.value })
              }
              placeholder="Введіть URL зображення"
            />
          </div>
          <div>
            <MyInput
              type="text"
              onChange={(e) =>
                setUserInfo({ ...userInfo, address: e.target.value })
              }
              placeholder={address}
            />
          </div>
          <div>
            <MyTextArea
              onChange={(e) =>
                setUserInfo({ ...userInfo, disease: e.target.value })
              }
              placeholder={desie}
            />
          </div>
          <div>
            <MyTextArea
              placeholder={userInformation}
              onChange={(e) =>
                setUserInfo({ ...userInfo, history: e.target.value })
              }
            />
          </div>
          <div>
            <MyTextArea
              placeholder={userHistory}
              onChange={(e) =>
                setUserInfo({ ...userInfo, procedures: e.target.value })
              }
            />
          </div>
          <AddBtn className={styles["add-form__btn"]} onClick={addPatient}>
            {addUser}
          </AddBtn>
        </div>
      </div>
    </div>
  );
};

export default AddInfoForm;
