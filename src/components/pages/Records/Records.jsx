import { useEffect, useState } from "react";
import Container from "../../UI/Container/Container";
import { MyInput } from "../../UI/MyInput/MyInput";
import styles from "./Records.module.scss";
import AddRecords from "../../layout/AddRecords/AddRecords";
import useApi from "../../hooks/getUsers";
import RecordsList from "../../layout/RecordsList/RecordsList";
import Loader from "../../UI/Loader/Loader";
import axios from "axios";

const Records = () => {
  const [searchRecords, setSearchRecords] = useState("");
  const [records, setRecords] = useState([]);
  const [loader, setLoader] = useState(true);

  const { data, isLoading, error } = useApi("http://localhost:3000/records");

  useEffect(() => {
    if (data) {
      setRecords(data);
      setLoader(false);
    }
  }, [data]);

  const serchRecordsHandler = (event) => {
    setSearchRecords(event);
  };

  const [showForm, setShowForm] = useState(false);

  const delateRecords = async (id) => {
    axios
      .delete(`http://localhost:3000/records/${id}`)
      .then((response) => {
        console.log("Запис видалено", response);
      })
      .catch((error) => {
        console.error("Помилка при видалені запису", error);
      });
    setRecords(records.filter((record) => record.id !== id));
  };

  return (
    <div className={styles.records}>
      <Container>
        <div className={styles["records-content"]}>
          <MyInput
            value={searchRecords}
            onChange={(e) => serchRecordsHandler(e.target.value)}
            type="number"
            maxLength="50"
            placeholder="Введіть ID запису"
          />
          <button
            className={styles["records-btn"]}
            onClick={() => setShowForm(true)}
          >
            Додати запис
          </button>

          {showForm && (
            <AddRecords
              addUser="Додати запис"
              setShowForm={setShowForm}
              records={records}
              setRecords={setRecords}
              api="records"
            />
          )}
        </div>

        {isLoading || loader ? (
          <Loader />
        ) : (
          <RecordsList
            searchRecords={searchRecords}
            delateRecords={delateRecords}
            records={records}
          />
        )}
      </Container>
    </div>
  );
};

export default Records;
