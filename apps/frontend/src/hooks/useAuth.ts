import { useAuthStore } from "@/store/auth.store";
import { api } from "@/api";
import type { Password } from "bun";
import { useNavigate } from "react-router-dom";


export function useAuth()
{
    const setUser = useAuthStore( state => state.setUser  );
    const clearUser = useAuthStore( state => state.clearUser
    )

    const login = async ( email: string, password: string ) =>{
        try{
            const data = await api.sendLoginRequest( email, password );
            setUser( { username: data.username, id: data.id, email: data.email } );
            localStorage.setItem("token", data.token );
            


        }
        catch( err  )
        {
            throw err;
        }
    };


    const signup = async ( email: string, password: string, username: string  )  => {
        try{
            const data  =  await api.signup( email, password, username );
            console.log( "signuped "); 
            
        }
        catch( err )
        {
            throw err;
        }
    };


    const authMe = async ( token: string ) => {
        try{
            const token = localStorage.getItem("token");
            const data = await api.verify( token as string )
            setUser( data );
            
         }
        catch( err )
        {
            clearUser();
            throw err;
        }
    }

    return {
        authMe, login, signup
    }
}