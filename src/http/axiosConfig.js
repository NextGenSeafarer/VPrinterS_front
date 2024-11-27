import axios from "axios";

export const API_URL = 'http://localhost:8080'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((promise) => {
        if (token) {
            promise.resolve(token);
        } else {
            promise.reject(error);
        }
    });
    failedQueue = [];
};

// let authContext = null;
//
// export const setAuthContext = (context) => {
//     authContext = context;
// };

$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 419 && !originalRequest._retry) {
            originalRequest._retry = true;
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const {data} = await $api.post("/auth/refresh", {withCredentials: true});
                    localStorage.setItem('accessToken', data.access_token);
                    const {accessToken} = data;
                    $api.defaults.headers.Authorization = `Bearer ${accessToken}`;
                    // markAsAuthenticated();
                    //TODO: deal with interseptors while refreshing access token to change to  unauthorized
                    processQueue(null, accessToken);
                    isRefreshing = false;
                    return $api(originalRequest);
                } catch (refreshError) {
                    processQueue(refreshError, null);
                    isRefreshing = false;
                    // markAsUnauthenticated();
                    return Promise.reject(refreshError);
                }
            }

            return new Promise((resolve, reject) => {
                failedQueue.push({
                    resolve: (token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve($api(originalRequest));
                    },
                    reject: (err) => reject(err),
                });
            });
        }
        return Promise.reject(error);
    }
);


export default $api;