import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { StateProvider } from "./context/StateProvider.jsx";
import { initialState } from "./context/intialState.js";
import reducer from "./context/reducer.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </Router>
);
