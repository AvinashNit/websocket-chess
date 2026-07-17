import type { Request, Response  } from "express";
import { USERS } from "../data/user.data";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { chownSync } from "fs";

export const authController = {

        login : async ( req: Request , res: Response)=>{
            const { email, password } = req.body ;
            if( !email || !password )
                return res.status(400).json({
                    success:"false",
                    error:{
                        reason:"Not proper credentials "
                    }
                })
            const userExist =  USERS.find( user => user.email === email );
            if( !userExist )
                return res.status( 400 ).json({
                        succes:"false",
                        error:{
                            reason:" User does not found "
                        }
                    })
            
           const isLegitimate = await bcrypt.compare( password, userExist.password);
           if( !isLegitimate )
                return res.status( 401 ).json({
                    succes:false,
                    error:{
                        reason:"Wrong password"
                    }
                })

            const token = jwt.sign({ id: userExist .id , email:userExist.email, name: userExist.username}, "secretKey");
            return res.status( 200 ).json({
                    success:true,
                    data:{
                        token : token
                    }
            })
            
        },

        signup : async ( req:Request, res: Response  ) => {
            const { username , password , email } = req.body;
            if( !email || !password || !username )
                res.status( 400 ).json({
                    success:false,
                    error:{
                        reason:" No valid credentials ",
                    }
                })
            const userExist = USERS.find( user => user.email === email )
            if( userExist )
                return res.status(400).json({
                    success:false,
                    error:{
                        reason:"User already exists"
                    }
                })
            const id = crypto.randomUUID();
            const hashedPassword =  await bcrypt.hash( password ,10);
            USERS.push( { username, email, password:hashedPassword , id });
            console.log("User created successfully");
            console.log( USERS )
            return res.status( 201 ).json({
                success: true,
                data:{
                    id,
                    email,
                    username
                }
            })
        },

        authMe : async (req: Request, res: Response ) => {
            const  token  = req.headers.authorization?.split(" ")[1];
            if( !token )
                return res.status( 400 ).json({
                    success:false,
                    error:{
                        reason:"No token provided"
                    }
                })
            try{
             const decoded = jwt.verify( token , "secretKey") as { id: string, username: string, email:string };
             return res.status( 200 ).json({
                success: true,
                data:{
                    id: decoded.id,
                    username: decoded.username,
                    email:decoded.email
                }
             })
            }
            catch( err )
            {
                return res.status( 400 ).json({
                    success:false,
                    error:{
                        reason:"Invalid token"
                    }
                })
            }
            
        }

}