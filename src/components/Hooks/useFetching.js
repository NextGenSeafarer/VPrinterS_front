import { useState, useContext } from "react";
import {ErrorContext} from "../../services/Errors/ErrorContext.jsx";


export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const { showError } = useContext(ErrorContext);

    const fetching = async (...args) => {
        try {
            setIsLoading(true);
            await callback(...args);
        } catch (err) {
            showError(err.response?.data?.message || err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return [fetching, isLoading];
};
