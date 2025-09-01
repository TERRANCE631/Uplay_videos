import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalContext } from "../Hooks/Context/useContext";

export const SecuredRoute = ({ children }) => {
    const { user } = GlobalContext()
    const navigate = useNavigate()

    const checkAuth = () => {
        if (user) {
            return user ? children : <Navigate to={"/"} />;
        } else if (!user) {
            toast.error("Sign in to your account");
            navigate("/")
        };
    };

    return checkAuth()
};