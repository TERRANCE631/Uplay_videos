import { Navigate } from "react-router-dom";

export const SecuredRoute = ({ children }) => {
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    return token ? children : <Navigate to={"/"} />;
};