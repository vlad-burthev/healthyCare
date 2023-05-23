import { useEffect, useState } from "react";
import styles from "./PersonalPage.module.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Container from "../../UI/Container/Container";
import CinItem from "../../layout/CinItem/CinItem";
import ChangeInfoForm from "../../layout/ChangeInfoForm/ChangeInfoForm";

const PersonalPage = () => {
  const registerLogin = useSelector((state) => state.repos.register);
  const personalLogin = useSelector((state) => state.repos.personal);

  const { id } = useParams();
  const [patient, setPatient] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/personal/${id}`)
      .then((response) => {
        const data = response.data;
        setPatient(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [records, setRecords] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/records/`)
      .then((response) => {
        const data = response.data;
        setRecords(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [doctorRecords, setDoctorRecords] = useState([]);
  useEffect(() => {
    setDoctorRecords(
      records.filter((record) => record.personalId === patient.id)
    );
  }, [records]);

  const value = localStorage.getItem("myKey");
  return (
    <div className={styles["patient-page"]}>
      <Container>
        <div className={styles["patient-page__content"]}>
          {showForm && (
            <ChangeInfoForm
              userAPI="personal"
              userDisease="Введіть професію працівника"
              userAddres="Введіть номер кабінету"
              userHistory="Введіть інформацію про освіту"
              userInformation="Введіть інформацію про працівника"
              patient={patient}
              setPatient={setPatient}
              setShowForm={setShowForm}
              showForm={showForm}
            />
          )}

          <div className={styles["patient-page__id"]}>ID: {patient.id}</div>
          <div className={styles["patient-page__personal-information"]}>
            <div
              className={styles["patient-page__photo"]}
              style={{
                width: "300px",
                height: "300px",
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundImage: `url(${
                  patient.photo
                    ? patient.photo
                    : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                })`,
              }}
            ></div>
            <div className={styles["patient-page__contact"]}>
              <div>
                ПІБ:
                <span>{patient.name}</span>
              </div>
              <div>
                Вік:
                <span>{patient.age}</span>
              </div>
              <div>
                Телефон:
                <span>{patient.phone}</span>
              </div>
              <div>
                Email:
                <span>{patient.email}</span>
              </div>
              <div>
                Кабінет:
                <span>{patient.address}</span>
              </div>
            </div>
          </div>
          <div className={styles["patient-page__medicine-information"]}>
            <h3>Професія мед. працівника</h3>
            <div className={styles["medicine-information-history"]}>
              {patient.disease}
            </div>
            <h3>Інформація про освіту</h3>
            <div className={styles["medicine-information-history"]}>
              {patient.history}
            </div>
            <h3>Інформація про мед. працівника</h3>
            <div className={styles["medicine-information-procedures"]}>
              {patient.procedures}
            </div>
          </div>
          {(registerLogin || id === value) && (
            <button
              className={styles["open-change-form"]}
              onClick={() => setShowForm(true)}
            >
              Оновити інформацію
            </button>
          )}
        </div>
        {!personalLogin && (
          <div className={styles["doctor-records"]}>
            <h1>Записи пацієнтів за весь час</h1>

            <div className={styles["doctor-records__content"]}>
              {doctorRecords.map((docRec) => (
                <CinItem
                  recID={records.id}
                  key={docRec.id}
                  docRec={docRec}
                  url={docRec.patinetId}
                  docRecName={docRec.patientName}
                  doctorRecords={doctorRecords}
                  setDoctorRecords={setDoctorRecords}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default PersonalPage;
