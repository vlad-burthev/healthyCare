import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./components/UI/Loader/Loader";

const Login = React.lazy(() => import("./components/pages/Login/Login"));
const Main = React.lazy(() => import("./components/pages/Main/Main"));

function App() {
  const login = useSelector((state) => state.repos.login);
  const data = localStorage.getItem("myKey");

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.onbeforeunload = handleBeforeUnload;

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="main/*" element={<Main />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
