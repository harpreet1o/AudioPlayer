import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./components";
import { Home } from "./components";
import { useEffect, useState } from "react";
import { app } from "./config/firebase";

import { getAuth } from "firebase/auth";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";

//to use framer-motion
import { AnimatePresence } from "framer-motion";
import { validateUser } from "./api";

function App() {
  const firebaeAuth = getAuth(app);
  const navigate = useNavigate();
  console.log(useStateValue());
  const [{ user }, dispatch] = useStateValue();

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  useEffect(() => {
    firebaeAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          console.log(token);

          validateUser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          });
        });
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        navigate("/login");
      }
    });
  }, []);
  return (
    //animate presence to use framer motion on all divs
    <AnimatePresence mode="wait">
      <div className="h-auto min-w-[680px] bg-primary flex justify-center items-center">
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default App;
