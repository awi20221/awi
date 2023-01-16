import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const accessToken = localStorage.getItem("accessToken");

    return (            
        auth?.accessToken || accessToken
            ? <Outlet />
               : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;