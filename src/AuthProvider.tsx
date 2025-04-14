import React, { createContext, useContext, useState } from "react";
import { api } from "./Api";

// Define interface for the context value
interface AuthContextType {
  user: any;
  logout: () => Promise<void>;
  login: (data: { username: string, email: string }) => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setIsAuthorized: (isAuthorized:boolean)=>Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

let globalLogout = () => {};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const navigate = useNavigate();
  const [user, setUser] = useState<any>({});
  
  const login = async (data: { username: string, email: string }): Promise<void> => {
    try {
      localStorage.setItem('user', JSON.stringify(data));
      console.log('in here Tabs');
      // navigate('/Home');
      return;
    } catch(error) {
      console.log(error);
    }
  };
  
  const logout = async (): Promise<void> => {
    try {
      const res = await api.post('api/user/logout');
      console.log(res);
      localStorage.clear();
      // navigate('/');
    } catch(error) {
      console.log(error);
    }
  };
  const setIsAuthorized = async (isAuthorized:boolean): Promise<void> => {
    try {
      localStorage.setItem('isAuthorized',isAuthorized.toString() );
    } catch(error) {
      console.log(error);
    }
  };


  
  globalLogout = logout;
  
  const value: AuthContextType = {
    user,
    logout,
    login,
    setUser,
    setIsAuthorized
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const getGlobalLogout = () => globalLogout;