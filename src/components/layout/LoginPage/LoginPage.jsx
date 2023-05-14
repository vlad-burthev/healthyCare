import { useEffect, useState } from "react";
import { MyInput } from "../../UI/MyInput/MyInput";
import styles from "./LoginPage.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // в инпорт
import {
  setRegister,
  setLogin,
  setPatient,
  setDoctorLogin,
  setID,
  setLoginHow,
  setPersonalLogin,
} from "../../../Reducers/loginReduce";

const LoginPage = ({ signList }) => {
  const dispatch = useDispatch();
  const [loginAss, setLoginAss] = useState("patients");
  const [activeBtn, setActiveBtn] = useState("Пацієнт");
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  const [api, setApi] = useState("patients");
  useEffect(() => {
    setApi(loginAss);
  }, [loginAss]);

  useEffect(() => {
    fetch(`http://localhost:3000/${api}`)
      .then((res) => res.json())
      .then((data) => setPatients(data));
  }, [api]);

  const [signIN, setSignIN] = useState({
    login: "",
    pass: "",
  });

  const [patientID, setpatientID] = useState();
  useEffect(() => {
    const matchingPatient = patients.find(
      (patient) => patient.login === signIN.login
    );
    if (matchingPatient) {
      setpatientID(matchingPatient.id);
    }
  }, [patients, signIN.login]);

  const signUser = () => {
    const isPatientExists = patients.some((patient) => {
      if (patient.login === signIN.login && patient.pass === signIN.pass) {
        setpatientID(patient.id);
        return true;
      }
      return false;
    });

    if (isPatientExists) {
      dispatch(setLogin(true));
      switch (loginAss) {
        case "users":
          localStorage.setItem("myKey", 1);
          dispatch(setRegister(true));
          navigate(`/main/home`);
          break;

        case "patients":
          localStorage.setItem("myKey", patientID);
          dispatch(setPatient(true));
          navigate(`/main/${api}/${patientID}`);
          dispatch(setID(patientID));
          dispatch(setLoginHow("patients"));
          break;

        case "doctors":
          localStorage.setItem("myKey", patientID);
          dispatch(setDoctorLogin({ doctor: true, patientID: patientID }));
          navigate(`/main/${api}/${patientID}`);
          dispatch(setID({ patientID: patientID }));
          dispatch(setLoginHow("doctors"));
          break;

        case "personal":
          localStorage.setItem("myKey", patientID);
          dispatch(setPersonalLogin({ personal: true, patientID: patientID }));
          navigate(`/main/${api}/${patientID}`);
          dispatch(setID(patientID));
          dispatch(setLoginHow("personal"));
          break;

        default:
          break;
      }
    } else {
      alert("Не вірний пароль або логін!");
    }
  };

  return (
    <div className={styles.login}>
      <div>
        <h1>Ви хочете увійти як :</h1>
        <div className={styles["toogle-block"]}>
          {signList[0] &&
            Object.keys(signList[0]).map((key) => (
              <button
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
          onChange={(e) => setSignIN({ ...signIN, login: e.target.value })}
        />
      </div>
      <div>
        <MyInput
          placeholder="Введіть пароль"
          onChange={(e) => setSignIN({ ...signIN, pass: e.target.value })}
        />
      </div>

      <button className={styles["login-btn"]} onClick={signUser}>
        Авторизуватись
      </button>
    </div>
  );
};

export default LoginPage;
