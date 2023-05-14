import RecordItem from "../RecordItem/RecordItem";
import styles from "./RecordsList.module.scss";

const RecordsList = ({ searchRecords, delateRecords, records }) => {
  const recordFilter = records.filter((record) =>
    record.id.toString().includes(searchRecords)
  );

  return (
    <div className={styles["list-item"]}>
      {recordFilter.reverse().map((record) => (
        <RecordItem
          delateRecords={delateRecords}
          key={record.id}
          record={record}
        />
      ))}
    </div>
  );
};

export default RecordsList;
