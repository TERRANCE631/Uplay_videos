import { Navigate } from "react-router-dom";
import { GlobalContext } from "../Hooks/Context/useContext";

export const SecuredRoute = ({ children }) => {
    const { user } = GlobalContext()

    const checkAuth = () => {
        return user ? children : <Navigate to={"/"} />;
    };

    return checkAuth()
};