import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/Auth/Auth";
import { Dash } from "./pages/Dash/Dash";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />}></Route>
        <Route path="/dash" element={<Dash />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
