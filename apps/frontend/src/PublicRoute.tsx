import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./store/auth.store";



export function PublicRoute()
{
    const user =  useAuthStore( state => state.user );

    if( user ) 
        return <Navigate to="/home"></Navigate>
    else
        return <Outlet></Outlet>

}
