import { useMutation } from "@tanstack/react-query";
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

type FormMode = "login" | "register" | "verify";

export const Auth: React.FC = () => {
  const [formMode, setFormMode] = useState<FormMode>("login");
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => authApi.login(false, data),
    onSuccess: (data) => {
      login(data.user, data.role);
      navigate("/dash");
    },
    onError: (error: unknown) => {
      console.error("Login failed:", error);
    },
  });

  const signupMutation = useMutation({
    mutationFn: (payload: RegisterFormData & { role: string }) =>
      authApi.signup(false, payload),
    onSuccess: (_data, variables) => {
      setRegisteredEmail(variables.email);
      setFormMode("verify");
    },
    onError: (error: unknown) => {
      console.error("Registration failed:", error);
    },
  });

  const verifyMutation = useMutation({
    mutationFn: (data: VerifyFormData) => authApi.verify(false, data),
    onSuccess: () => {
      setFormMode("login");
    },
    onError: (error: unknown) => {
      console.error("Verification failed:", error);
    },
  });

  const toggleMode = (mode: FormMode) => {
    setFormMode(mode);
  };

  const handleLogin = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const handleRegister = (data: RegisterFormData) => {
    const payload = {
      ...data,
      role: "ROLE_USER",
    };
    signupMutation.mutate(payload);
  };

  const handleVerify = (data: VerifyFormData) => {
    verifyMutation.mutate(data);
  };

  const displayForms = (formMode: FormMode) => {
    switch (formMode) {
      case "register":
        return (
          <RegisterForm
            onSubmit={handleRegister}
            toggleMode={toggleMode}
            isLoading={signupMutation.isPending}
            serverError={
              signupMutation.error ? String(signupMutation.error) : undefined
            }
          />
        );
      case "login":
        return (
          <LoginForm
            onSubmit={handleLogin}
            toggleMode={toggleMode}
            isLoading={loginMutation.isPending}
            serverError={
              loginMutation.error ? String(loginMutation.error) : undefined
            }
          />
        );
      case "verify":
        return (
          <VerifyForm
            onSubmit={handleVerify}
            initialEmail={registeredEmail ?? undefined}
            isLoading={verifyMutation.isPending}
            serverError={
              verifyMutation.error ? String(verifyMutation.error) : undefined
            }
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
