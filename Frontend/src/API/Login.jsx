import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login', { email, password });
            setToken(response.data.token);
            setRefreshToken(response.data.refreshToken);
            // Start token refresh interval
            startTokenRefresh();
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const startTokenRefresh = () => {
        setInterval(async
