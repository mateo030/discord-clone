import React, { createContext, useContext, useEffect, useState } from "react";

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

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        console.log("Checking current user authorization...");
        const currentUserResponse = await authApi.currentUser(false);
        console.log(currentUserResponse);

        if (!currentUserResponse) {
          console.log("Current user session does not exist");
          return;
        }

        console.log("Current user: " + currentUserResponse);

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
  }, []);

  const login = (user: User, role: string) => {
    setAuthState({
      user: user,
      roles: role,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    const logoutResponse = authApi.logout(false);
    console.log(logoutResponse);
    console.log("Logout Successful");
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
