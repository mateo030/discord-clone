import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "@/context/authContext";
import { Auth } from "@/pages/Auth/Auth";
import { Dash } from "@/pages/Dash/Dash";
import { ProtectedRoute } from "@/routes/protectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />}></Route>
          <Route path="/dash" element={<ProtectedRoute />}>
            <Route index element={<Dash />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
