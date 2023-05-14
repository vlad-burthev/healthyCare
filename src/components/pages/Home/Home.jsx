import { useEffect, useState } from "react";
import useApi from "../../hooks/getUsers";
import Container from "../../UI/Container/Container";
import RecordItem from "../../layout/RecordItem/RecordItem";
import Loader from "../../UI/Loader/Loader";
import styles from "./Home.module.scss";
import axios from "axios";
import RightSide from "../../layout/RightSide/RightSide";

const Home = () => {
  const [records, setRecords] = useState([]);
  const [loader, setLoader] = useState(true);
  const { data, isLoading, error } = useApi("http://localhost:3000/records");
  useEffect(() => {
    if (data) {
      setRecords(data);
      setLoader(false);
    }
  }, [data]);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Устанавливаем время в полночь
  const filteredRecords = records.filter((record) => {
    const recordDate = new Date(record.recordDate);
    recordDate.setHours(0, 0, 0, 0); // Устанавливаем время в полночь
    return (
      recordDate.getFullYear() === today.getFullYear() &&
      recordDate.getMonth() === today.getMonth() &&
      recordDate.getDate() === today.getDate()
    );
  });

  const filteredRecordsTime = records.some((record) => {
    const recordDate = new Date(record.recordDate);
    recordDate.setHours(0, 0, 0, 0); // Устанавливаем время в полночь
    return (
      recordDate.getFullYear() <= today.getFullYear() &&
      recordDate.getMonth() <= today.getMonth() &&
      recordDate.getDate() <= today.getDate()
    );
  });

  const delateRecords = async (id) => {
    axios
      .delete(`http://localhost:3000/records/${id}`)
      .then((response) => {
        console.log(`Запис видалено + ${response}`);
      })
      .catch((error) => {
        console.error("Помилка при видалені запису", error);
      });
    setRecords(records.filter((record) => record.id !== id));
  };

  return (
    <div className={styles.home}>
      <Container>
        <div className={styles["home-records"]}>
          <h1>Запси на сьогодні </h1>
          {filteredRecords.length === 0 ? (
            <h3 className={styles["home-records-none"]}>
              На сьогодні записів не має
            </h3>
          ) : (
            ""
          )}
          {loader ? (
            <Loader />
          ) : (
            filteredRecords.map((date) => (
              <RecordItem
                delateRecords={delateRecords}
                key={date.id}
                record={date}
                filteredRecordsTime={filteredRecordsTime}
              />
            ))
          )}
        </div>
        <RightSide />
      </Container>
    </div>
  );
};

export default Home;
