import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 초기값 false

  useEffect(() => {
    // sessionStorage에서 로그인 상태 확인
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // 토큰이 있으면 로그인 상태로 설정
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
