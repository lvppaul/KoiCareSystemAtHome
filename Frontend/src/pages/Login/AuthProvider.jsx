import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const login = (username, password) => {
		// Mockup login logic
		if (username === 'user' && password === 'userpass') {
			const newUser = { username, role: 'user' };
			setUser(newUser);
			return newUser;
		} else if (username === 'admin' && password === 'adminpass') {
			const newUser = { username, role: 'admin' };
			setUser(newUser);
			return newUser;
		}
		return null;
	};

	const logout = () => {
		setUser(null);
	};

	const value = {
		user,
		login,
		logout
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
