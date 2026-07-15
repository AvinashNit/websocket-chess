import { WebSocketServer } from "ws";
import http from "http";
import { handleConnection } from "./events/connection.event";





export class Websocketserver{
    private  wsserver : WebSocketServer 

    constructor( httpServer : http.Server )
    {
        this.wsserver = new WebSocketServer({
            server:httpServer,
            path:"/ws"
        });

        this.wsserver.on("connection", handleConnection )
    }
}

    