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

// Function to sign up shop
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
        const email = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
        const userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        const userRole = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        localStorage.setItem('user', JSON.stringify({ userId, userRole }));
        const message = response.data.message;
        console.log(message);
        return {  userId, userRole ,message};
    } catch (error) {
        if (error.response) {
            console.error('Error response data:', error.response.data);
            return error.response.data.message;
        } else {
            return { error: 'Unknown error occurred' };
        }
    }
};

// Function to confirm email
const confirmEmail = async (confirmData) => {
    try {
        const response = await api.post(`Account/ConfirmEmail`, confirmData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        );
        console(response.data)
        return response.data;
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

const getUserIdByEmail = async (email) => {
    try {
        const response = await api.get(`Account/GetUserIdByEmail/${encodeURIComponent(email)}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting user ID by email:', error);
        return null;
    }
}

const googleLogIn = async (token) => {
    try {
        const response = await api.post('Account/gmail-signin', { token }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const decoded = jwtDecode(response.data.accessToken);
        const email = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
        const userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        const userRole = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        localStorage.setItem('user', JSON.stringify({ userId, userRole }));
        const message = response.data.message;
        console.log(message);
        return { email, userId, userRole ,message};
    } catch (error) {
        console.error('Error during Google login:', error);
        if (error.response) {
            console.error('Error response data:', error.response.data);
            return error.response.data;
        } else {
            return { error: 'Unknown error occurred' };
        }
    }
}
export { signUp, signUpShop, signIn, confirmEmail, getUserIdByEmail, googleLogIn };