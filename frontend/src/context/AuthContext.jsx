import { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Check if user is already logged in on refresh
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/check-auth", {
          withCredentials: true,
        });
        setUser(response.data.user); // adjust based on your API response
      } catch (error) {
        setUser(null); // not logged in
      } finally {
        setIsLoading(false); // stop loading after check
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      throw new Error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        userData,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      throw new Error("Registration failed: " + error.message);
    }
  };

  const logout = async () => {
    await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
    toast.success("Logged out successfully!");
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
