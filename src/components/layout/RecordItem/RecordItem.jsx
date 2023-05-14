import DelateBtn from "../../UI/DelateBtn/DelateBtn";
import styles from "./RecordItem.module.scss";
import { useSelector } from "react-redux";

const RecordItem = ({ record, delateRecords, filteredRecordsTime }) => {
  const registerLogin = useSelector((state) => state.repos.register);

  return (
    <div
      style={{
        backgroundColor: filteredRecordsTime ? "rgb(205, 248, 208)" : "none",
      }}
      className={styles.record}
    >
      <div className={styles["record-id"]}>ID: {record.id}</div>
      <div className={styles["record-content"]}>
        <div className={styles["record-patient"]}>
          <div
            style={{
              width: "150px",
              height: "150px",
              backgroundPosition: "center center",
              backgroundSize: "cover",
              borderRadius: "50%",
              border: "2px solid #4b7e52",
              backgroundImage: `url(${
                record.patientPhoto
                  ? record.patientPhoto
                  : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
              })`,
            }}
          ></div>
          <div>{record.patientName}</div>
          <div>{record.patientPhone}</div>
          <div>{record.patientEmail}</div>
          <div>{record.patientAddress}</div>
          <div>{record.patientDisease}</div>
        </div>

        <div className={styles["record-datetime"]}>
          <p>{record.recordDate}</p>
          <p>{record.recordTime}</p>
        </div>

        <div className={styles["record-doctor"]}>
          <div
            style={{
              width: "150px",
              height: "150px",
              border: "2px solid #000",
              backgroundPosition: "center center",
              backgroundSize: "cover",
              borderRadius: "50%",
              backgroundImage: `url(${
                record.doctorPhoto
                  ? record.doctorPhoto
                  : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
              })`,
            }}
          ></div>
          <div>{record.doctorName}</div>
          <div>{record.doctorPhone}</div>
          <div>{record.doctorEmail}</div>
          <div>{record.doctorAddress}</div>
          <div>{record.doctorSpec}</div>
        </div>
      </div>
      {registerLogin && (
        <DelateBtn
          className={styles["record-btn__delate"]}
          onClick={() => delateRecords(record.id)}
        >
          Видалити
        </DelateBtn>
      )}
    </div>
  );
};

export default RecordItem;
