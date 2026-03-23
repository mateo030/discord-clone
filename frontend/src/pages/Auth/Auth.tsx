import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { useAuth } from "@/context/authContext";

import "./style.css";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

type FormMode = "login" | "register";

export const Auth: React.FC = () => {
  const [formMode, setFormMode] = useState<FormMode>("login");
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const toggleMode = () => {
    setFormMode((prevMode) => (prevMode === "login" ? "register" : "login"));
  };

  const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login("dummyToken");
    console.log("Login Data: ", loginData);
    navigate("/dash");
  };

  const handleRegisterFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Register Data:", registerData);
  };

  return (
    <div className="container">
      {formMode === "register" ? (
        <RegisterForm
          onFormChange={handleRegisterFormChange}
          onRegister={handleRegister}
          toggleMode={toggleMode}
        />
      ) : (
        <LoginForm
          onFormChange={handleLoginFormChange}
          onLogin={handleLogin}
          toggleMode={toggleMode}
        />
      )}
    </div>
  );
};
