import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios.js";
import { requestOtpLogin, verifyOtp, registerUser } from "../api/auth.api";

interface User {
  id: string;
  national_id: string;
  full_name: string;
  email: string;
  phone?: string;
  gender?: string;
  balance?: number;
  card_id?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (national_id: string) => Promise<any>;
  verify: (national_id: string, otp: string) => Promise<any>;
  register: (data: any) => Promise<any>;
  logout: () => void;
  updateProfile: (data: any) => Promise<any>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("access_token"));
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token && !user) {
      // Fetch user profile when token exists but user is not loaded
      api.get('/auth/me')
        .then(res => setUser(res.data.user))
        .catch(() => {
          // Token is invalid, clear it
          logout();
        });
    }
  }, [token]);

  const login = async (national_id: string) => {
    setIsLoading(true);
    try {
      const response = await requestOtpLogin(national_id);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verify = async (national_id: string, otp: string) => {
    setIsLoading(true);
    try {
      const response = await verifyOtp(national_id, otp);
      const { token, user } = response.data;

      localStorage.setItem("access_token", token);
      setToken(token);
      setUser(user);

      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await registerUser(data);
      const { token, user } = response.data;

      localStorage.setItem("access_token", token);
      setToken(token);
      setUser(user);

      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: any) => {
    setIsLoading(true);
    try {
      // We need to import updatesUserProfile first, see next edit
      // Assuming it's imported as updateUserProfile from api
      const response = await import("../api/auth.api").then(module => module.updateUserProfile(data));
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    setUser(null);
    // Redirect logic usually handled by router or consuming component
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoading,
      login,
      verify,
      register,
      logout,
      updateProfile,
      isAuthenticated: !!token
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
