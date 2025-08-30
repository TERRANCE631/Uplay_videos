import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const SecuredRoute = ({ children }) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const navigate = useNavigate()

    const checkAuth = () => {
        if (token) {
            return token ? children : <Navigate to={"/"} />;
        } else if (!token) {
            toast.error("Sign in to your account");
            navigate("/")
        };
    };

    return checkAuth()
};