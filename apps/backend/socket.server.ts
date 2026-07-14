import { WebSocketServer } from "ws";

const PLAYERS = [];

class createServer{
    private wss : WebSocketServer | null = null;
    constructor( server )
    {
        this.wss =  new WebSocketServer({
            server,
            path:"/ws"
        })


        this.wss.on("connection", this.handleConnection )
    }

    handleConnection(  ws: WebSocket  ){
        const token = ws
    }

    handleIncomingMessage(){

    }

    handleClose(){
        
    }

}