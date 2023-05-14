import { useState } from "react";
import { MyTextArea } from "../../UI/MyInput/MyInput";
import styles from "./ConclusionForm.module.scss";

const ConclusionForm = ({
  docRec,
  addConclusion,
  setShowConclusionForm,
  conclusionText,
  setConclusionText,
}) => {
  return (
    <>
      <div
        className={styles.ConclusionForm}
        onClick={() => setShowConclusionForm(false)}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <h2>Введіть висновок</h2>
          <MyTextArea
            value={conclusionText}
            onChange={(e) => setConclusionText(e.target.value)}
          />
          <button onClick={() => addConclusion(docRec.id)}>
            Додати висновок
          </button>
        </div>
      </div>
    </>
  );
};

export default ConclusionForm;
