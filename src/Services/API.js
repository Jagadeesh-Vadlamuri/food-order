import axios from 'axios';
import TokenService from './Token_Service';
import AuthService from './Auth_Service';
import {useNavigate} from 'react-router-dom';

const instance = axios.create({
    URL: 'https://food-delivery150.herokuapp.com',
    headers: {
        'Content-Type': 'application/json'
    },
})

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if(token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async(err) => {
        const originalConfig = err.config;

        if(err.response) {
            if(err.response.status ===403 && !originalConfig._retry) {
                originalConfig._retry = true;

                try{
                    const rs = await instance.post('/auth/token',  {
                        refreshToken: TokenService.getLocalRefreshToken(),
                    });

                    console.log("response", rs);

                    const {accessToken} = rs.data;

                    console.log('updateNewAccessToken', accessToken);
                    TokenService.updateNewAccessToken(accessToken);

                    return instance(originalConfig);
                } catch(err) {
                    return Promise.reject(err)
                }
            }
        }
        return Promise.reject(err)
    }
);

export default instance;