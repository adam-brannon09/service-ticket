import axios from 'axios';

// API URL
const API_URL = '/api/users';

// Register User
const register = async (userData) => {
    const response = await axios.post(API_URL, userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Login User
const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};


const logout = () => {
    localStorage.removeItem('user');
};

//export functions so they can be used in auth slice
const authService = {
    register,
    login,
    logout
};

export default authService;