import styles from "./Doctors.module.scss";
import Container from "../../UI/Container/Container";
import { useEffect, useState } from "react";
import AddInfoForm from "../../layout/AddInfoForm/AddInfoForm";
import UserList from "../../layout/UserList/UserList";
import useApi from "../../hooks/getUsers";
import { MyInput } from "../../UI/MyInput/MyInput";
import Loader from "../../UI/Loader/Loader";
import axios from "axios";
import { useSelector } from "react-redux";

const Doctors = () => {
  const patient = useSelector((state) => state.repos.patient);
  const doctorLogin = useSelector((state) => state.repos.doctor);

  const [searchDoctor, setSearchDoctor] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loader, setLoader] = useState(true);

  const { data, isLoading, error } = useApi("http://localhost:3000/doctors");
  useEffect(() => {
    if (data) {
      setDoctors(data);
      setLoader(false);
    }
  }, [data]);

  const serchDoctorsHandler = (event) => {
    setSearchDoctor(event);
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
    setDoctors(doctors.filter((doctor) => doctor.id !== id));
  };

  return (
    <div className={styles.doctors}>
      <Container>
        <MyInput
          value={searchDoctor}
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
            addUser="Додати лікаря"
            userHistory="Введіть інформацію про освіту"
            desie="Введіть професію"
            userInformation="Введіть інформацію про лікаря"
            setShowForm={setShowForm}
            user={doctors}
            setUser={setDoctors}
            api="doctors"
          />
        )}

        {isLoading || loader ? (
          <Loader />
        ) : (
          <UserList
            patient={patient}
            searchUser={searchDoctor}
            delateUser={delateDoctor}
            users={doctors}
          />
        )}
      </Container>
    </div>
  );
};
export default Doctors;
