import {useCallback, useEffect, useState} from "react";
import $api, {setAuthContext} from "../http/axiosConfig.js";
import {AuthContext} from "./AuthContext.jsx";
import {API_LOGIN_URL, API_LOGOUT_URL, API_PERSONAL_URL, API_REGISTRATION_URL} from "../http/APIendpoints.js";

export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);

    const login = async (email, password) => {
        try {
            const response = await $api.post(API_LOGIN_URL, {email, password});
            localStorage.setItem("accessToken", response.data.access_token);
            setIsAuthenticated(true);
            localStorage.setItem("userEmail", email);
            await isNewUserCheck();
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || "Not correct login/password");
            } else {
                throw new Error("Server unavailable or something went wrong");
            }
        }
    };

    const logout = async () => {
        try {
            await $api.post(API_LOGOUT_URL);
        } catch (error) {
            console.error("Error happened during logout" + error);
        } finally {
            localStorage.clear();
            window.location.href = "/login";
            setIsAuthenticated(false);
        }
    };

    const registration = async (email, password, password_confirmation) => {
        try {
            await $api.post(API_REGISTRATION_URL, {email, password, password_confirmation})
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || "Something went wrong");
            } else {
                throw new Error("Server unavailable or something went wrong");
            }
        }
    }


    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            setIsAuthenticated(true);
            isNewUserCheck();
        } else {
            setIsAuthenticated(false);
        }

    }, []);


    const markAsAuthenticated = useCallback(() => {
        setIsAuthenticated(true);
    }, []);


    const markAsUnauthenticated = useCallback(() => {
        setIsAuthenticated(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userEmail");
        window.location.href = "/login";
    }, []);

    const isNewUserCheck = async () => {
        try {
            await $api.get(API_PERSONAL_URL)
            setIsNewUser(false)
        } catch (error) {
            if (error.response.status === 404) {
                setIsNewUser(true);
            }
        }
    }



    useEffect(() => {
        setAuthContext({ markAsUnauthenticated, markAsAuthenticated, logout});
    }, [markAsUnauthenticated, markAsAuthenticated, logout]);



    return (
        <>
            <AuthContext.Provider value={{
                isAuthenticated, login, logout, markAsAuthenticated, markAsUnauthenticated,
                isNewUser, setIsNewUser, registration
            }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}