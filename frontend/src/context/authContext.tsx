import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { authApi } from "@/api/authApi";
import type { User } from "@/types/api";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, role: string) => void;
  logout: () => void;
  isLoading: boolean;
};

interface AuthState {
  user: User | null;
  roles: string;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    roles: "",
    isAuthenticated: false,
    isLoading: true,
  });
  const location = useLocation();

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        if (location.pathname === "/") return;
        const currentUserResponse = await authApi.currentUser(false);
        console.log(currentUserResponse);

        if (!currentUserResponse) {
          console.error("Current user session does not exist");
          return;
        }

        setAuthState({
          user: currentUserResponse,
          roles: "USER",
          isAuthenticated: true,
          isLoading: false,
        });

        return;
      } catch (error) {
        console.log(error);
      }
    };
    checkCurrentUser();
  }, [location.pathname]);

  const login = (user: User, role: string) => {
    setAuthState({
      user: user,
      roles: role,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    authApi.logout(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        isAuthenticated: !!authState.user,
        login,
        logout,
        isLoading: authState.isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
