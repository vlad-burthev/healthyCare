import { useEffect, useState } from "react";
import MedListItem from "../MedListItem/MedListItem";
import styles from "./MedList.module.scss";

const MedList = ({
  users,
  delateUser,
  searchUser,
  patientLogin,
  doctorLogin,
  setMed,
}) => {
  const userFilter = users.filter(
    (user) =>
      user.name
        .replace(/\s+/g, "")
        .toLowerCase()
        .includes(searchUser.toLowerCase().replace(/\s+/g, "")) ||
      user.id.toString().includes(searchUser)
  );

  return (
    <div className={styles["list-item"]}>
      {userFilter.reverse().map((user) => (
        <MedListItem
          setPatient={setMed}
          delateUser={delateUser}
          key={user.id}
          medID={user.id}
          userMed={user}
        />
      ))}
    </div>
  );
};

export default MedList;
