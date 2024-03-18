import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { DashBoard, Login, Home, MusicPlayer } from "./components";

import { useEffect, useState } from "react";
import { app } from "./config/firebase";

import { getAuth } from "firebase/auth";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";

//to use framer-motion
import { AnimatePresence, motion } from "framer-motion";
import { validateUser } from "./api";

function App() {
  const firebaeAuth = getAuth(app);
  const navigate = useNavigate();
  // console.log(useStateValue());
  const [{ user, isSongPlaying }, dispatch] = useStateValue();

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  useEffect(() => {
    firebaeAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
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
          <Route path="/dashBoard/*" element={<DashBoard />} />
        </Routes>
        {isSongPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed min-w-[700px] h-26  inset-x-0 bottom-0  bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
            <MusicPlayer />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
export default App;
