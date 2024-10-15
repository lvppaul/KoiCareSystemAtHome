import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing stored user:', error);
                localStorage.removeItem('user'); // Clear invalid data
            }
        }
        setLoading(false);
    }, [navigate]);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    };

    const hasRole = (role) => {
        if (role === 'shop'){
            return user?.role === role;
        } else {
        const roleHierarchy = ['member', 'vip', 'admin'];
        const userRoleIndex = roleHierarchy.indexOf(user?.role);
        const requiredRoleIndex = roleHierarchy.indexOf(role);
        return userRoleIndex >= requiredRoleIndex;
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while checking the user
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};