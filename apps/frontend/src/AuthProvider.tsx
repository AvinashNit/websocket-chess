import { useEffect, type ReactNode } from "react";
import { useAuthStore, type User } from "./store/auth.store";
import { api } from "./api";
import { useNavigate } from "react-router-dom";


export function AuthProvider( { children  } :{ children: ReactNode }) {

    

    const token  = localStorage.getItem( "token" );

    

    useEffect(  ()=>{
        
        async function verifying()
        {
            await api.verify( token as string ); 
        }

        verifying();
     
    }

    

    ,[])


    return children;
}