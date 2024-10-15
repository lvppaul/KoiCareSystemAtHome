import api from './AxiosConfig';
import { jwtDecode } from 'jwt-decode';

// Function to sign up
const signUp = async (userData) => {
    try {
        const response = await api.post('Account/CreateMemberAccount', userData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        return response.data;
    } catch (error) {
        return error.response.data;
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
        const email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
        const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

        // Return both the user data and the role
        localStorage.setItem('user', JSON.stringify({ email, userRole, userId })); // Save the user data to local storage
        return { userRole, email, userId }; // Return email and role, userid
    } catch (error) {
        return error.response.data;
    }
};

export { signUp, signIn };