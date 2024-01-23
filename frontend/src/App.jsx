import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components";
import { Home } from "./components";

function App() {
  return (
    <div className="w-screen h-screen bg-primary flex justify-center items-center">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
