import styles from "./AddRecords.module.scss";
import { useEffect, useState } from "react";
import { MyInput, MyInputRadio, MyTextArea } from "../../UI/MyInput/MyInput";
import ErrorForm from "../../UI/ErrorForm/ErrorForm";
import useApi from "../../hooks/getUsers";
import axios from "axios";

const AddRecords = ({ addUser, setShowForm, records, api, setRecords }) => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const { data } = useApi("http://localhost:3000/doctors");

  useEffect(() => {
    if (data) {
      setDoctors(data);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/patients");
        const data = await response.json();
        setPatients(data);
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, []);

  const [userInfo, setUserInfo] = useState({
    patientDisease: "",
    patientId: "",
    doctorId: "",
    patientName: "",
    doctorName: "",
    patientPhone: "",
    doctorPhone: "",
    patientEmail: "",
    doctorEmail: "",
    patientAddress: "",
    doctorAddress: "",
    patientPhoto: "",
    doctorPhoto: "",
    doctorSpec: "",
    recordDate: "",
    recordTime: "",
    conclusion: "",
    id: Date.now(),
  });
  const [showError, setShowError] = useState(false);

  const [userId, setUserId] = useState();
  const [patientInfo, setPatientInfo] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/patients/${userId}`
        );
        const data = await response.json();
        setPatientInfo(data);
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, [userId]);

  const [userIdD, setUserIdD] = useState();
  const [doctorInfo, setDoctorInfo] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/doctors/${userIdD}`
        );
        const data = await response.json();
        setDoctorInfo(data);
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, [userIdD]);

  const dateFilter = records.some((obj) => {
    if (obj.recordDate === doctorInfo.date) {
      if (obj.recordTime === doctorInfo.time) {
        return console.log(true), true;
      }
    }
    return false;
  });

  const addPatient = () => {
    const newUser = {
      patinetId: userId,
      patientName: patientInfo.name,
      doctorId: userIdD,
      doctorName: doctorInfo.name,
      patientPhone: patientInfo.phone,
      doctorPhone: doctorInfo.phone,
      patientEmail: patientInfo.email,
      doctorEmail: doctorInfo.email,
      patientAddress: patientInfo.address,
      doctorAddress: doctorInfo.address,
      patientPhoto: patientInfo.photo,
      doctorPhoto: doctorInfo.photo,
      patientDisease: patientInfo.disease,
      doctorSpec: doctorInfo.disease,
      recordDate: userInfo.date,
      recordTime: userInfo.time,
      conclusion: "",
      id: Date.now(),
    };

    if (dateFilter === false) {
      if (
        userInfo.patientName.length === 0 ||
        userInfo.doctorName.length === 0
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
        setRecords([...records, newUser]);
        setShowForm(false);

        const newRecord = {
          recordDate: userInfo.date,
          recordTime: userInfo.time,
        };

        axios
          .get(`http://localhost:3000/patients/${userId}`)
          .then((response) => {
            const patient = response.data;
            patient.recordHistory.push(newRecord);
            return axios.put(
              `http://localhost:3000/patients/${userId}`,
              patient
            );
          });

        axios
          .get(`http://localhost:3000/doctors/${userIdD}`)
          .then((response) => {
            const doctor = response.data;
            doctor.recordHistory.push(newRecord);
            return axios.put(
              `http://localhost:3000/doctors/${userIdD}`,
              doctor
            );
          });
      }
    } else {
      alert("На цей час вже є запис");
    }
  };

  //patients
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (event) => {
    setSelectedValue(event.target.value);
    setIsOpen(Boolean(event.target.value));
  };

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (option) => {
    setSelectedValue(option.name);
    setIsOpen(false);
    setUserInfo({ ...userInfo, patientName: option.name });
    setUserId(option.id);
  };

  const [checkDate, setCheckDate] = useState(false);

  useEffect(() => {
    const userDate = new Date(userInfo.date);
    const currentDate = new Date();

    if (userDate === currentDate) {
      setCheckDate(true);
    } else {
      setCheckDate(false);
    }
  }, [userInfo.date]);

  //doctors
  const [selectedValueD, setSelectedValueD] = useState("");
  const [isOpenD, setIsOpenD] = useState(false);

  const handleInputChangeD = (event) => {
    setSelectedValueD(event.target.value);

    setIsOpenD(Boolean(event.target.value));
  };

  const handleInputClickD = () => {
    setIsOpenD(!isOpenD);
  };

  const handleItemClickD = (option) => {
    setSelectedValueD(option.name);
    setIsOpenD(false);
    setUserInfo({ ...userInfo, doctorName: option.name });
    setUserIdD(option.id);
  };

  //

  return (
    <div className={styles["add-info__bg"]} onClick={() => setShowForm(false)}>
      <div
        className={styles["add-info__content"]}
        onClick={(e) => e.stopPropagation()}
      >
        {showError && <ErrorForm setShowError={setShowError} />}
        <div className={styles["add-info__form"]}>
          <div className={styles["add-info__patient"]}>
            <div className={styles["add-info__patient-name"]}>
              <MyInput
                type="text"
                id="my-input"
                value={selectedValue}
                onChange={handleInputChange}
                onClick={handleInputClick}
                placeholder="Введіть ім'я пацієнта"
              />
              {isOpen && (
                <ul
                  className={styles["add-info__patient-list"]}
                  style={{ zIndex: 1000 }}
                >
                  {patients
                    .filter((option) =>
                      option.name
                        .toLowerCase()
                        .includes(selectedValue.toLowerCase())
                    )
                    .map((option) => (
                      <li
                        key={option.id}
                        onClick={() => handleItemClick(option)}
                      >
                        {option.name} - {option.id}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
          <div className={styles["add-info__patient"]}>
            <div className={styles["add-info__doctor-name"]}>
              <MyInput
                type="text"
                id="my-input"
                value={selectedValueD}
                onChange={handleInputChangeD}
                onClick={handleInputClickD}
                placeholder="Введіть ім'я лікаря"
              />
              {isOpenD && (
                <ul
                  className={styles["add-info__doctor-list"]}
                  style={{ zIndex: 1000 }}
                >
                  {doctors
                    .filter((option) =>
                      option.name
                        .toLowerCase()
                        .includes(selectedValueD.toLowerCase())
                    )
                    .map((option) => (
                      <li
                        key={option.id}
                        onClick={() => handleItemClickD(option)}
                      >
                        {option.name} - {option.id}
                      </li>
                    ))}
                </ul>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div style={{ width: "40%" }}>
                <MyInput
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, date: e.target.value })
                  }
                  placeholder="Оберіть дату"
                />
              </div>
              <div style={{ width: "40%" }}>
                <MyInput
                  type="time"
                  id="appt"
                  name="appt"
                  min={`08:00`}
                  max="18:00"
                  step="3600"
                  required
                  placeholder="Оберіть дату прийому"
                  value={userInfo.time || ""}
                  onChange={(e) => {
                    const inputTime = e.target.value;
                    const validTime = inputTime.replace(/:\d\d$/, ":00"); // заменяем минуты на 00

                    if (validTime > "18:00" || validTime <= "07:00") {
                      setUserInfo({ ...userInfo, time: "" }); // обновляем состояние приложения с пустым значением
                    } else {
                      e.target.value = validTime; // обновляем значение поля ввода
                      setUserInfo({ ...userInfo, time: validTime }); // обновляем состояние приложения
                    }
                  }}
                  className="my-input"
                  onInput={(e) => {
                    const input = e.target.value;
                    if (input < e.target.min) {
                      e.target.value = e.target.min;
                    } else if (input > e.target.max) {
                      e.target.value = e.target.max;
                    }
                    e.target.setCustomValidity("");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <button className={styles["add-form__btn"]} onClick={addPatient}>
          {addUser}
        </button>
      </div>
    </div>
  );
};

export default AddRecords;
