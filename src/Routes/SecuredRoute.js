import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export const SecuredRoute = ({ children }) => {
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    const checkAuth = () => {
        const userFoundOrNot = token ? children : <Navigate to={"/"} />;
        const error = !token && toast.error("Sign in to your account")
        return 
    };
    return
};