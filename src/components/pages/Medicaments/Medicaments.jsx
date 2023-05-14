import styles from "./Medicaments.module.scss";
import Container from "../../UI/Container/Container";
import { useEffect, useState } from "react";
import useApi from "../../hooks/getUsers";
import { MyInput } from "../../UI/MyInput/MyInput";
import AddBtn from "../../UI/AddBtn/AddBtn";
import Loader from "../../UI/Loader/Loader";
import AddInfoMed from "../../layout/AddInfoMed/AddInfoMed";
import MedList from "../../layout/MedList/MedList";
import axios from "axios";
import { useSelector } from "react-redux";

const Medicaments = () => {
  const patientLogin = useSelector((state) => state.repos.patient);
  const doctorLogin = useSelector((state) => state.repos.doctor);
  const registerLogin = useSelector((state) => state.repos.register);

  const [searchMed, setSearchMed] = useState("");
  const [med, setMed] = useState([]);
  const [loader, setLoader] = useState(true);

  const { data, isLoading, error } = useApi(
    "http://localhost:3000/medicaments"
  );
  useEffect(() => {
    if (data) {
      setMed(data);
      setLoader(false);
    }
  }, [data]);

  const searchMedHandler = (event) => {
    setSearchMed(event);
  };
  const [showForm, setShowForm] = useState(false);

  const delateMed = async (id) => {
    axios
      .delete(`http://localhost:3000/medicaments/${id}`)
      .then((response) => {
        console.log("Медикамент видалено");
      })
      .catch((error) => {
        console.error("Помилка при видалені медикомента", error);
      });
    setMed(med.filter((med) => med.id !== id));
  };

  return (
    <div className={styles.med}>
      <Container>
        <MyInput
          value={searchMed}
          onChange={(e) => searchMedHandler(e.target.value)}
          type="text"
          maxLength="50"
          placeholder="Введіть назву або ID медикоменту"
        />
        {registerLogin && (
          <AddBtn
            className={styles["patients-add"]}
            onClick={() => setShowForm(true)}
          >
            Додати медикамент
          </AddBtn>
        )}

        {showForm && (
          <AddInfoMed
            setShowForm={setShowForm}
            user={med}
            setUser={setMed}
            api="medicaments"
          />
        )}

        {isLoading || loader ? (
          <Loader />
        ) : (
          <MedList
            setMed={setMed}
            doctorLogin={doctorLogin}
            searchUser={searchMed}
            delateUser={delateMed}
            users={med}
            patientLogin={patientLogin}
          />
        )}
      </Container>
    </div>
  );
};

export default Medicaments;
