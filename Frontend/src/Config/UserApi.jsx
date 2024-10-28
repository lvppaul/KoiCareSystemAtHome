import api from './AxiosConfig';

// Function to get account by userId
const getAccountByUserId = async (userId) => {
    try {
        const response = await api.get(`Account/GetAccountByUserId/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting account by userId:', error);
        return null;
    }
}

// Function to get user ID by email
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

// Function to delete account
const deleteAccount = async (userId) => {
    try {
        const response = await api.put(`Account/DeleteAccount/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response;
    } catch (error) {
        console.error('Error deleting account:', error);
        if (error.response) {
            console.error('Error response data:', error.response.data);
            return error.response.data;
        } else {
            return { error: 'Unknown error occurred' };
        }
    }
}

// Function to update account
const updateAccount = async (userId, account) => {
    try {
        const response = await api.put(`Account/UpdateAccountDetail${userId}`, account, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error updating account:', error);
        if (error.response) {
            console.error('Error response data:', error.response.data);
            return error.response.data;
        } else {
            return { error: 'Unknown error occurred' };
        }
    }
}

export { getAccountByUserId, getUserIdByEmail, deleteAccount, updateAccount };