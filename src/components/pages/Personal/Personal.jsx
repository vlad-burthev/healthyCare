import styles from "./Personal.module.scss";
import Container from "../../UI/Container/Container";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useApi from "../../hooks/getUsers";
import { MyInput } from "../../UI/MyInput/MyInput";
import Loader from "../../UI/Loader/Loader";
import UserList from "../../layout/UserList/UserList";
import axios from "axios";
import AddInfoForm from "../../layout/AddInfoForm/AddInfoForm";

const Personal = () => {
  const patient = useSelector((state) => state.repos.patient);
  const doctorLogin = useSelector((state) => state.repos.doctor);

  const [searchPersonal, setSearchPersonal] = useState("");
  const [personal, setPersonal] = useState([]);
  const [loader, setLoader] = useState(true);

  const { data, isLoading, error } = useApi("http://localhost:3000/personal");
  useEffect(() => {
    if (data) {
      setPersonal(data);
      setLoader(false);
    }
  }, [data]);

  const serchDoctorsHandler = (event) => {
    setSearchPersonal(event);
  };

  const [showForm, setShowForm] = useState(false);

  const delateDoctor = async (id) => {
    axios
      .delete(`http://localhost:3000/doctors/${id}`)
      .then((response) => {
        console.log("Пользователь удален");
      })
      .catch((error) => {
        console.error("Ошибка при удалении пользователя", error);
      });
    setPersonal(personal.filter((doctor) => doctor.id !== id));
  };

  return (
    <div className={styles.doctors}>
      <Container>
        <MyInput
          value={searchPersonal}
          onChange={(e) => serchDoctorsHandler(e.target.value)}
          type="text"
          maxLength="50"
          placeholder="Введіть ім'я або ID лікаря або професію"
        />

        {!patient && !doctorLogin && (
          <button
            className={styles["doctors-add"]}
            onClick={() => setShowForm(true)}
          >
            Додати лікаря
          </button>
        )}

        {showForm && (
          <AddInfoForm
            address="Введіть № кабінету"
            addUser="Додати медичного працівника"
            userHistory="Введіть інформацію про освіту"
            desie="Введіть спеціальність"
            userInformation="Введіть інформацію про медичного працівника"
            setShowForm={setShowForm}
            user={personal}
            setUser={setPersonal}
            api="personal"
          />
        )}

        {isLoading || loader ? (
          <Loader />
        ) : (
          <UserList
            patient={patient}
            searchUser={searchPersonal}
            delateUser={delateDoctor}
            users={personal}
          />
        )}
      </Container>
    </div>
  );
};

export default Personal;
