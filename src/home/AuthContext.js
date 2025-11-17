import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    fetch(`${API_BASE_URL}/verify/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`  // Updated header for JWT Bearer token
      },
      body: JSON.stringify({})

    })
    .then(r => r.json())
    .then(resp => {
      // Assuming the backend sends back a JSON response indicating success or failure
      if (resp.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    }
    )
    .catch(error => {
      console.error('Verification failed:', error);
      setIsAuthenticated(false);
      setIsLoading(false);
    });
    }, []);

   const logout = () => {
     const confirm = window.confirm("Are you sure you want to logout?");
       if (confirm) {
         localStorage.removeItem('user');
         setIsAuthenticated(false);
       }
    };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading, setIsLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
