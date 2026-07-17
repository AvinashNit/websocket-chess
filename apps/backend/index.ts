import http from "http";
import express from "express";
import { Websocketserver } from "./socket.server";
import { authController } from "./controller/auth.controller";
import cors from "cors";





const app = express();
app.use( cors() );
app.use( express.json() );

app.post("/auth/login", authController.login )
app.post("/auth/signup", authController.signup)

app.get("/auth/me", authController.authMe );



const httpServer  =  app.listen( 3000, ()=>{
  console.log(" Server running over 3000 ")
})



new Websocketserver( httpServer );