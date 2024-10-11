import api from './AxiosConfig';
import { jwtDecode } from 'jwt-decode';

// Function to sign up
const signUp = async (userData) => {
    try {
        const response = await api.post('Account/SignUp', userData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error signing up:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to sign in
const signIn = async (credentials) => {
    try {
        const response = await api.post('Account/SignIn', credentials, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const token = response.data;
        // Decode the JWT token to get user role
        const decoded = jwtDecode(token)
        // Extract the role from the decoded token
        const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]; 
        // Return both the user data and the role
        localStorage.setItem('token', token); // Save the token to local storage
        return { userRole, token }; // Return user data, role, and token
    } catch (error) {
        console.error('Error signing in:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export { signUp, signIn };