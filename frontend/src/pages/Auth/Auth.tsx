import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authApi } from "@/api/authApi";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { VerifyForm } from "@/components/VerifyForm";
import { useAuth } from "@/context/authContext";
import "./style.css";
import type {
  LoginFormData,
  RegisterFormData,
  VerifyFormData,
} from "@/types/types";

// TODO: Change to enum
type FormMode = "login" | "register" | "verify";

export const Auth: React.FC = () => {
  const [formMode, setFormMode] = useState<FormMode>("login");
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  // MEMO: Should this function really be like this
  const toggleMode = (formMode: FormMode) => {
    setFormMode(formMode);
  };

  const handleLogin = async (data: LoginFormData) => {
    try {
      const res = await authApi.login(false, data);
      console.log(res);
      login(res.user, res.role);
      navigate("/dash");
    } catch (err) {
      console.error(err);
    }
  };

  // TODO: Add a waiting symbol after pressing register btn
  const handleRegister = async (data: RegisterFormData) => {
    const role = "ROLE_USER";
    const payload = {
      ...data,
      role,
    };
    try {
      const res = await authApi.signup(false, payload);
      console.log(res);
      setRegisteredEmail(data.email);
      toggleMode("verify");
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerify = async (data: VerifyFormData) => {
    try {
      const response = await authApi.verify(false, data);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const displayForms = (formMode: FormMode) => {
    switch (formMode) {
      case "register":
        return (
          <RegisterForm onSubmit={handleRegister} toggleMode={toggleMode} />
        );
      case "login":
        return <LoginForm onSubmit={handleLogin} toggleMode={toggleMode} />;
      case "verify":
        return (
          <VerifyForm
            onSubmit={handleVerify}
            initialEmail={registeredEmail ?? undefined}
          />
        );
    }
  };

  return (
    <>
      <div className="logo-container">
        <h1 className="logo">Whisper</h1>
        <p className="subtitle">A light-weight chat system</p>
      </div>
      {displayForms(formMode)}
    </>
  );
};
