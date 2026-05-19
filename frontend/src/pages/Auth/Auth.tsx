import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authApi } from "@/api/authApi";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { VerifyForm } from "@/components/VerifyForm";
import { useAuth } from "@/context/authContext";

import "./style.css";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface VerifyFormData {
  email: string;
  verificationCode: string;
}

type FormMode = "login" | "register" | "verify";

export const Auth: React.FC = () => {
  const [formMode, setFormMode] = useState<FormMode>("login");
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "ROLE_USER",
  });
  const [verifyFormData, setVerifyFormData] = useState<VerifyFormData>({
    email: "",
    verificationCode: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  // MEMO: Should this function really be like this
  const toggleMode = (formMode: FormMode) => {
    setFormMode(formMode);
  };

  const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // const params = new URLSearchParams();
    // console.log(loginData);
    // params.append("email", loginData.email);
    // params.append("password", loginData.password);
    // const userData = await authApi.login(false, params);
    // if (userData) {
    //   login("dummyToken");
    //   navigate("/dash");
    // } else {
    //   console.error("Login failed");
    // }

    login("dummyToken");
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
    const response = authApi.signup(false, registerData);
    console.log(response);
    toggleMode("verify");
  };

  const handleVerifyFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setVerifyFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleVerify = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Verify Form Data:", verifyFormData);
    const response = authApi.verify(false, verifyFormData);
    console.log(response);
  };

  const displayForms = (formMode: FormMode) => {
    switch (formMode) {
      case "register":
        return (
          <RegisterForm
            onFormChange={handleRegisterFormChange}
            onRegister={handleRegister}
            toggleMode={toggleMode}
          />
        );
      case "login":
        return (
          <LoginForm
            onFormChange={handleLoginFormChange}
            onLogin={handleLogin}
            toggleMode={toggleMode}
          />
        );
      case "verify":
        return (
          <VerifyForm
            onFormChange={handleVerifyFormChange}
            onVerify={handleVerify}
          />
        );
    }
  };

  return <div className="container">{displayForms(formMode)}</div>;
};
