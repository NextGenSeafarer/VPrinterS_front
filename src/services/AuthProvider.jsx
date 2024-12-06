import {useCallback, useEffect, useState} from "react";
import $api from "../http/axiosConfig.js";
import {AuthContext} from "./AuthContext.jsx";

export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (email, password) => {
        try {
            const response = await $api.post("/auth/login", {email, password});
            localStorage.setItem("accessToken", response.data.access_token);
            setIsAuthenticated(true);
            localStorage.setItem("userEmail", email);
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || "Not correct login/password");
            } else {
                console.error(error);
                throw new Error("Server unavailable or something went wrong");
            }
        }
    };

    const logout = async () => {
        try {
            await $api.post("/auth/logout");
        } catch (error) {
            console.error("Error happened during logout" + error);
        } finally {
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
            setIsAuthenticated(false);
        }

    };

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);


    const markAsAuthenticated = useCallback(() => {
        setIsAuthenticated(true);
    }, []);

    // Функция для сброса авторизации
    const markAsUnauthenticated = useCallback(() => {
        setIsAuthenticated(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userEmail");
        window.location.href = "/login";
    }, []);



    return (
        <>
            <AuthContext.Provider value={{isAuthenticated, login, logout, markAsAuthenticated, markAsUnauthenticated}}>
                {children}
            </AuthContext.Provider>
        </>
    )
}