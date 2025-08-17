// import axios from "axios";

// const api = axios.create({
//     baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1",
//     withCredentials: true,
//     timeout: 10000,
// });

// // Request interceptor
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token");
//         if (token) config.headers.Authorization = `Bearer ${token}`;
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // Response interceptor
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             localStorage.removeItem("token");
//             window.location.href = "/login";
//         }
//         return Promise.reject(
//             error.response?.data?.message || "Something went wrong. Try again."
//         );
//     }
// );

// export default api;

import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1",
    withCredentials: true,
    timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");

            // Don't redirect if we're already on login/register pages
            // or if this is the initial auth check
            const currentPath = window.location.pathname;
            const isAuthPage = currentPath === '/login' || currentPath === '/register';
            const isUserCheck = error.config?.url?.includes('/user');

            if (!isAuthPage && !isUserCheck) {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;