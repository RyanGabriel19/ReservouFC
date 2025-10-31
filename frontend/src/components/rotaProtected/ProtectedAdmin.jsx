import { getDecodedToken } from "../../pages/conta/perfil/perfil";
import { Navigate } from "react-router-dom";

export function ProtectedAdmin({children}){

    const user = getDecodedToken();

    if(!user || user.tipo !== "a"){
        return <Navigate to="/home" replace/>
    }

    return children;
}
export default ProtectedAdmin;