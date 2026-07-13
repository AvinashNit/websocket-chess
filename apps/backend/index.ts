import http from "http";
import { WebSocketServer } from "ws";

const server = http.createServer();



server.on("request", ( req, res )=>{
    console.log( req.url )
    res.write("Hello");
    res.end();
})


const wss = new WebSocketServer({
    server,
    path:"/ws"
})


wss.on("connection", ( ws, req )=>{
    console.log( req.url );
    ws.on("message", ( message )=>{
        wss.clients.forEach( ws1 => ws1.send( message ) )
    })
    
})


server.listen(3000,()=>{
    console.log("Server started on port 3000")
})