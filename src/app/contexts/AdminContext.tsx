import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Admin password - change this to your secure password
const ADMIN_PASSWORD = "sk1234";

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  // Check admin status on mount
  useEffect(() => {
    const adminStatus = localStorage.getItem("portfolio_admin");
    const adminTime = localStorage.getItem("portfolio_admin_time");

    if (adminStatus === "true" && adminTime) {
      // Admin session expires after 7 days
      const elapsed = Date.now() - parseInt(adminTime);
      if (elapsed < 7 * 24 * 60 * 60 * 1000) {
        setIsAdmin(true);
      } else {
        localStorage.removeItem("portfolio_admin");
        localStorage.removeItem("portfolio_admin_time");
      }
    }
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem("portfolio_admin", "true");
      localStorage.setItem("portfolio_admin_time", Date.now().toString());
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("portfolio_admin");
    localStorage.removeItem("portfolio_admin_time");
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
