import api from './API';
import TokenService from './Token_Service';

const signup = (email, password) => {
    return api.post('/auth/signup', {
        email,
        password
    }).then((res) => {
        if(res.data.accessToken){
            TokenService.setUser(res.data);
        }

        return res.data;
    })
}

const login = (email, password) => {
    return api.post('/auth/login', {
        email,
        password
    }).then((res) => {
        if(res.data.accessToken) {
            TokenService.setUser(res.data);
        }

        return res.data
    })
}

const logout = () => {
    TokenService.removeUser();
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const authService = {
    signup,
    login,
    logout,
    getCurrentUser
}

export default authService;