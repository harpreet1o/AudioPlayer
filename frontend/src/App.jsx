import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./components";
import { Home } from "./components";
import { useEffect, useState } from "react";
import { app } from "./config/firebase";

import { getAuth } from "firebase/auth";

function App() {
  const firebaeAuth = getAuth(app);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  useEffect(() => {
    firebaeAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          console.log(token);
        });
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, []);
  return (
    <div className="w-screen h-screen bg-primary flex justify-center items-center">
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
