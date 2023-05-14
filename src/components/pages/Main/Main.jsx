import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import("../Home/Home"));
const LeftSide = React.lazy(() => import("../../layout/LeftSide/LeftSide"));
const Patients = React.lazy(() => import("../Patients/Patients"));
const Doctors = React.lazy(() => import("../Doctors/Doctors"));
const Records = React.lazy(() => import("../Records/Records"));
const Medicaments = React.lazy(() => import("../Medicaments/Medicaments"));
const Personal = React.lazy(() => import("../Personal/Personal"));

import { PatientPage } from "../PatientPage/PatientPage";
import { DoctorPage } from "../DoctorPage/DoctorPage";

import { useSelector } from "react-redux";
import NoLoggin from "../../layout/NoLoggin/NoLoggin";
import Loader from "../../UI/Loader/Loader";
import { Suspense } from "react";
import PersonalPage from "../PersonalPage/PersonalPage";

const Main = () => {
  const register = useSelector((state) => state.repos.register);
  const login = useSelector((state) => state.repos.login);

  return (
    <>
      {login ? (
        <>
          <LeftSide />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="patients" element={<Patients />} />
              <Route path="patients/:id" element={<PatientPage />} />
              <Route path="doctors" element={<Doctors />} />
              <Route path="doctors/:id" element={<DoctorPage />} />
              <Route path="records" element={<Records />} />
              <Route path="personal" element={<Personal />} />
              <Route path="medicaments" element={<Medicaments />} />
              <Route path="personal/:id" element={<PersonalPage />} />
            </Routes>
          </Suspense>
        </>
      ) : (
        <NoLoggin />
      )}
    </>
  );
};

export default Main;
