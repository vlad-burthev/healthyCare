import { useEffect, useState } from "react";
import RightSideList from "../RightSideList/RightSideList";
import styles from "./RightSide.module.scss";
import useApi from "../../hooks/getUsers";

const RightSide = () => {
  const [records, setRecords] = useState([]);
  const [loader, setLoader] = useState(true);

  const { data, isLoading } = useApi("http://localhost:3000/records");
  useEffect(() => {
    if (data) {
      setRecords(data);
      setLoader(isLoading);
    }
  }, [data]);

  return (
    <div className={styles["right-side"]}>
      <div className={styles["right-side__content"]}>
        <RightSideList records={records} loader={loader} />
      </div>
    </div>
  );
};

export default RightSide;
