import http from "http";
const httpServer = http.createServer();
import { Websocketserver } from "./socket.server";

  new Websocketserver( httpServer );



httpServer.on("request", ( req, res )=>{
   res.end("Rightly hit the endpoint")
})



httpServer.listen(3000,()=>{
    console.log("Server started on port 3000")
})

