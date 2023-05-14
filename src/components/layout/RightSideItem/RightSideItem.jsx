import { useEffect, useState } from "react";
import styles from "./RightSideItem.module.scss";
import useApi from "../../hooks/getUsers";
import axios from "axios";
import { Link } from "react-router-dom";

const RightSideItem = ({ record }) => {
  const [doctorRecords, setDoctorRecords] = useState([]);
  useEffect(() => {
    if (record) {
      axios
        .get(`http://localhost:3000/doctors/${record.doctorId}/records`)
        .then((response) => {
          setDoctorRecords(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div className={styles.RightSideItem}>
      <div>
        <Link to={`/main/doctors/${record.doctorId}`}>{record.doctorName}</Link>
        <p className={styles["RightSideItem-date"]}>
          {record.recordDate} - {record.recordTime}
        </p>
        <Link to={`/main/patients/${record.patinetId}`}>
          {record.patientName}
        </Link>
      </div>
    </div>
  );
};

export default RightSideItem;
