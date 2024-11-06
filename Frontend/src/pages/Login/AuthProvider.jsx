import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const roleHierarchy = {
    member: 1,
    vip: 2,
};

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
                localStorage.removeItem('user'); 
            }
        }
        setLoading(false);
    }, [navigate]);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('userData:', userData);
        navigate('/');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    };

    const hasRole = (requiredRole) => {
        if (requiredRole === 'shop'){
            return user && user.role === requiredRole;
        }
        if (requiredRole === 'admin') {
            return user && user.role === requiredRole;
        }
        return user && roleHierarchy[user.role] >= roleHierarchy[requiredRole];
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, hasRole }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);