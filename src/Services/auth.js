import axios from 'axios';

const API_URL = 'https://food-delivery150.herokuapp.com/auth';

const signup = (email, password) => {
    return axios.post(`${API_URL}/signup`, {
        email, 
        password
    }).then((res) => {
        if(res.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(res.data));
        }

        return res.data
    })
}

const login = (email, password) => {
    return axios.post(`${API_URL}/login`, {
        email,
        password
    }).then((res) => {
        if(res.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(res.data));
        }

        return res.data
    })
}

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

const authService =  {
    signup,
    login,
    logout,
    getCurrentUser
}

export default authService;