import {Navigate} from "react-router-dom";

export function Protected({children}){
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY_NAME);
    
    if(!token){
        return <Navigate to = "/login" replace/>
    }
    //se tiver token, redenriza normalmente
    return children;
}