import styles from "./Patients.module.scss";
import Container from "../../UI/Container/Container";
import { useEffect, useState } from "react";
import AddInfoForm from "../../layout/AddInfoForm/AddInfoForm";
import UserList from "../../layout/UserList/UserList";
import useApi from "../../hooks/getUsers";
import { MyInput } from "../../UI/MyInput/MyInput";
import Loader from "../../UI/Loader/Loader";
import axios from "axios";
import AddBtn from "../../UI/AddBtn/AddBtn";

const Patients = () => {
  const [serchPatient, setSerchPatient] = useState("");
  const [patients, setPatients] = useState([]);
  const [loader, setLoader] = useState(true);

  const { data, isLoading, error } = useApi("http://localhost:3000/patients");
  useEffect(() => {
    if (data) {
      setPatients(data);
      setLoader(false);
    }
  }, [data]);

  const serchPatientHandler = (event) => {
    setSerchPatient(event);
  };

  const [showForm, setShowForm] = useState(false);

  const delatePatient = async (id) => {
    axios
      .delete(`http://localhost:3000/patients/${id}`)
      .then((response) => {
        console.log("Пацієнта видалено");
      })
      .catch((error) => {
        console.error("Помилка при видалені пацієнта", error);
      });
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  return (
    <div className={styles.patients}>
      <Container>
        <MyInput
          value={serchPatient}
          onChange={(e) => serchPatientHandler(e.target.value)}
          type="text"
          maxLength="50"
          placeholder="Введіть ім'я або ID пацієнта"
        />
        <AddBtn onClick={() => setShowForm(true)}>Додати пацієнта</AddBtn>

        {showForm && (
          <AddInfoForm
            desie="Введіть симптоми захворювання"
            addUser="Додати пацієнта"
            userHistory="Введіть медичну історцію"
            userInformation="Введіть медичні процедури"
            address="Введіть адресу"
            setShowForm={setShowForm}
            user={patients}
            setUser={setPatients}
            api="patients"
          />
        )}

        {isLoading || loader ? (
          <Loader />
        ) : (
          <UserList
            searchUser={serchPatient}
            delateUser={delatePatient}
            users={patients}
          />
        )}
      </Container>
    </div>
  );
};

export default Patients;
