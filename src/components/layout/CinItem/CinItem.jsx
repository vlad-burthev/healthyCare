import React, { useState } from "react";
import ConclusionForm from "../ConclusionForm/ConclusionForm";
import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./CinItem.module.scss";
import axios from "axios";
import { useSelector } from "react-redux";

const CinItem = ({
  url,
  docRec,
  doctorRecords,
  setDoctorRecords,
  docRecName,
}) => {
  const patientLogin = useSelector((state) => state.repos.patient);
  const registerLoginb = useSelector((state) => state.repos.register);
  const { id } = useParams();
  const [showConclusionForm, setShowConclusionForm] = useState(false);
  const [conclusionText, setConclusionText] = useState("");
  const addConclusion = (recId) => {
    axios
      .get(`http://localhost:3000/records/${recId}`)
      .then((response) => {
        const record = response.data;
        record.conclusion = conclusionText;

        return axios.put(`http://localhost:3000/records/${recId}`, record);
      })
      .then((response) => {
        console.log("Record updated:", response.data);
        const index = doctorRecords.findIndex((record) => record.id === recId);

        const updatedRecords = [...doctorRecords];
        updatedRecords[index] = response.data;

        setDoctorRecords(updatedRecords);
      })
      .catch((error) => {
        console.error("Error updating record:", error);
      });

    setShowConclusionForm(false);
  };
  const value = localStorage.getItem("myKey");

  return (
    <div
      className={styles.CinItem}
      style={{ display: "block" }}
      key={docRec.id}
    >
      <div className={styles["CinItem-content"]}>
        <div className={styles["CinItem-id"]}>ID: {docRec.id}</div>
        <Link
          to={`/main/doctors/${url}`}
          className={styles["doctor-records__content-name"]}
        >
          {docRecName}
        </Link>
        {showConclusionForm && (
          <ConclusionForm
            docRec={docRec}
            conclusionText={conclusionText}
            setShowConclusionForm={setShowConclusionForm}
            addConclusion={addConclusion}
            setConclusionText={setConclusionText}
          />
        )}

        <div className={styles["doctor-records__content-date"]}>
          {docRec.recordDate} <span>{docRec.recordTime}</span>
        </div>
        <span className={styles["doctor-records__content-disease"]}>
          {docRec.patientDisease}
        </span>
      </div>
      <div className={styles["doctor-records__content-conclusion"]}>
        <h4>Висновок:</h4>
        <div>{docRec.conclusion}</div>
        {!patientLogin && id === value && (
          <button
            style={{ border: "none" }}
            onClick={() => setShowConclusionForm(true)}
          >
            Додати висновок
          </button>
        )}
      </div>
    </div>
  );
};

export default CinItem;
