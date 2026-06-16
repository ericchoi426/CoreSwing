import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  accessToken: string | null;
  fileId: string | null;
  setAuth: (token: string, file: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);

  const setAuth = (token: string, file: string) => {
    setAccessToken(token);
    setFileId(file);
  };

  const logout = () => {
    setAccessToken(null);
    setFileId(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, fileId, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
