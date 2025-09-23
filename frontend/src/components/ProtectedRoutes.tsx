import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const isAuthenticated = Cookies.get("token");
    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />
}

export default ProtectedRoutes
