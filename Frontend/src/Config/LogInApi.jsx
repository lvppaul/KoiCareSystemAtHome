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
    try{
        const response = await api.post('Account/SignIn', credentials, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        const decoded = jwtDecode(response.data);
        const email = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
        const userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        const userRole = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        localStorage.setItem('user', JSON.stringify({ email, userId, userRole }));

        return { email, userId, userRole };
    } catch (error) {
        console.error('Error during sign-in:', error);
        if (error.response) {
            console.error('Error response data:', error.response.data);
            return error.response.data;
        } else {
            return { error: 'Unknown error occurred' };
        }
    }
};

export { signUp, signIn };