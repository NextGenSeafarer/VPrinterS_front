import {useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {AuthContext} from "../services/AuthContext.jsx";

export const ProtectedRoute = () => {
    const {isAuthenticated} = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
