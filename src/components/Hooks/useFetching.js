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
            if (err.response?.data instanceof Blob) {
                const reader = new FileReader();
                reader.onload = () => {
                    try {
                        const errorData = JSON.parse(reader.result);
                        showError(errorData?.message || 'Unknown error occurred');
                    } catch {
                        showError('Server error');
                    }
                };
                reader.readAsText(err.response.data);
            } else {
                showError(err.response?.data?.message || err.response?.data || err.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return [fetching, isLoading];
};

