import type { Password } from "bun";
import type { User } from "./store/auth.store";


const baseURL = "http://localhost:3000"

export const api = {
    verify : async ( token: string ) : Promise< { id: string, username: string, email: string }> =>{
        const response =  await fetch(`${baseURL}/auth/me` , {
            method: "GET",
            headers:{
               Authorization:`Bearer ${ token }`
            }
        })

        if( !response.ok )
            throw new Error(" Invalid token ");

         return await response.json();
    
    },

    sendLoginRequest : async ( email: string, password: string  ) : Promise< {id: string,username:string, email:string ,token: string }> =>{
        const response  =  await fetch(`${ baseURL}/auth/login`, {
            method:"POST",
            headers:{
                "Content-type":"application/json",
                
            },

            body: JSON.stringify({ email, password })
        })

        if( !response.ok )
            throw new Error("Invalid credentials")

        return response.json() ;
    },

    signup : async( username: string, email: string, password: string): Promise<{ id: string, username: string, email: string }> =>{
        console.log("request sent")
        
        const response = await fetch(`${ baseURL }/auth/signup`, {
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })

        if( !response.ok )
            throw new Error("Could not signup")

        return await response.json();
    }
}






