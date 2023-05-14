import { useEffect, useState } from "react";
import { MyInput } from "../../UI/MyInput/MyInput";
import styles from "./RegForm.module.scss";

const RegForm = ({ signList }) => {
  const [loginAss, setLoginAss] = useState("patients");
  const [api, setApi] = useState("patients");

  useEffect(() => {
    setApi(loginAss);
  }, [loginAss]);
  const [activeBtn, setActiveBtn] = useState("Пацієнт");

  const [signIn, setSignIn] = useState({
    login: "",
    pass: "",
    name: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    address: "",
    history: "",
    photo: "",
    disease: "",
    procedures: "",
    recordHistory: [],
    id: Date.now(),
  });

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/${api}`)
      .then((res) => res.json())
      .then((res) => setUsers(res));
  }, [api]);

  const checkReg = users.find(
    (user) => user.login === signIn.login && user.email === signIn.email
  );

  const createUser = () => {
    const newUser = {
      ...signIn,
      login: signIn.login,
      pass: signIn.pass,
      name: signIn.name,
      phone: signIn.phone,
      email: signIn.email,
    };

    if (
      signIn.login.length === 0 ||
      signIn.pass.length === 0 ||
      signIn.email.length === 0 ||
      signIn.name.length === 0 ||
      signIn.phone.length === 0
    ) {
      alert("Усі поля повинні бути заповнені");
      return;
    }
    {
      if (!checkReg) {
        fetch(`http://localhost:3000/${api}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((response) => response.json())
          .catch((error) => console.log(error));
        alert("Ви успішно зареєструвались");
        setSignIn({
          ...signIn,
          login: "",
          pass: "",
          name: "",
          phone: "",
          email: "",
        });
        location.reload();
      } else {
        alert("Такий логін або email вже зареєстрований");
      }
    }
  };

  return (
    <div className={styles.reg}>
      <div>
        <h1>Ви хочете зареєструватися як :</h1>
        <div className={styles["toogle-block"]}>
          {signList[0] &&
            Object.keys(signList[0]).map((key) => (
              <button
                className={styles["toogle-btn"]}
                onClick={() => {
                  setLoginAss(signList[0][key].api);
                  setActiveBtn(signList[0][key].name);
                }}
                key={signList[0][key].name}
                style={{
                  background:
                    activeBtn === signList[0][key].name
                      ? "rgb(156, 255, 159)"
                      : "",
                }}
              >
                {signList[0][key].name}
              </button>
            ))}
        </div>
      </div>
      <div>
        <MyInput
          placeholder="Введіть логін"
          value={signIn.login}
          onChange={(e) => setSignIn({ ...signIn, login: e.target.value })}
        />
      </div>

      <div>
        <MyInput
          placeholder="Введіть пароль"
          value={signIn.pass}
          onChange={(e) => setSignIn({ ...signIn, pass: e.target.value })}
        />
      </div>

      <div>
        <MyInput
          placeholder="Введіть ПІБ"
          value={signIn.name}
          onChange={(e) => setSignIn({ ...signIn, name: e.target.value })}
        />
      </div>

      <div>
        <MyInput
          placeholder="Введіть номер"
          value={signIn.phone}
          onChange={(e) => setSignIn({ ...signIn, phone: e.target.value })}
        />
      </div>

      <div>
        <MyInput
          placeholder="Введіть email"
          value={signIn.email}
          onChange={(e) => setSignIn({ ...signIn, email: e.target.value })}
        />
      </div>
      <button className={styles["reg-btn"]} onClick={createUser}>
        Зарееструватись
      </button>
    </div>
  );
};

export default RegForm;
