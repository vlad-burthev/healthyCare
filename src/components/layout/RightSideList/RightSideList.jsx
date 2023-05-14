import styles from "./RightSideList.module.scss";
import { useEffect, useState } from "react";
import useApi from "../../hooks/getUsers";
import RightSideItem from "../RightSideItem/RightSideItem";
import axios from "axios";
import Loader from "../../UI/Loader/Loader";

const RightSideList = ({ records, loader }) => {
  return (
    <div className={styles.RightSideList}>
      <h2>Всі записи до лікарів</h2>
      {loader ? (
        <Loader />
      ) : (
        records.map((record) => (
          <RightSideItem key={record.id} record={record} />
        ))
      )}
    </div>
  );
};

export default RightSideList;
