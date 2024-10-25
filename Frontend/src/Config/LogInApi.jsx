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

        return response.status;
    } catch (error) {
        console.error('Error during sign-up:', error);
        if (error.response) {
            console.error('Error response data:', error.response.data);
            return error.response.data;
        } else {
            return { error: 'Unknown error occurred' };
        }
    }
};

const signUpShop = async (userData) => {
    try {
        const response = await api.post('Account/CreateShopAccount', userData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log(response);
        return response.status;
    } catch (error) {
        console.error('Error during sign-up:', error);
        if (error.response) {
            console.error('Error response data:', error.response.data);
            return error.response.data;
        } else {
            return { error: 'Unknown error occurred' };
        }
    }
}

// Function to sign in
const signIn = async (credentials) => {
    try {
        const response = await api.post('Account/SignIn', credentials, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        const decoded = jwtDecode(response.data.accessToken);
        const userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        const userRole = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        localStorage.setItem('user', JSON.stringify({ userId, userRole }));
        const message = response.data.message;
        console.log(message);
        return {  userId, userRole ,message};
    } catch (error) {
        if (error.response) {
            console.error('Error response data:', error.response.data.message);
            return error.response.data.message;
        } else {
            return { error: 'Unknown error occurred' };
        }
    }
};

// Function to confirm email
const confirmEmail = async (email, confirmationCode) => {
    try {
        const response = await api.post(`Account/ConfirmEmail/${email}/${confirmationCode}`);
        return response.status;
    } catch (error) {
        console.error('Error during email confirmation:', error.response.data);
        if (error.response) {
            console.error('Error response data:', error.response.data);
            return error.response.data;
        } else {
            return { error: 'Unknown error occurred' };
        }
    }
}

export { signUp, signUpShop, signIn, confirmEmail };