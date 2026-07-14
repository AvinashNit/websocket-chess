import { WebSocketServer } from "ws";
import http from "http";
import  { Chess }  from "chess.js"
import { connect } from "http2";

type chess = typeof Chess;


const Players : Map< string, WebSocket > = new Map();

const waitingPlayers :string[] = [];

const ActiveGame :{
    userA: string,
    userB: string,
    chessInstance : object
}[] = [];


export class Websocketserver{
    private  wsserver : WebSocketServer | null = null;

    constructor( httpServer : http.Server )
    {
        this.wsserver = new WebSocketServer({
            server:httpServer,
            path:"/ws"
        });

        this.handleConnection()
    }

     handleConnection(){
        this.wsserver?.on("connection", ( ws: WebSocket , req )=>{
            const id =  "player"+generateId();
            Players.set( id, ws );
            ws.send( JSON.stringify({
                id
            }))
            if( waitingPlayers.length != 0 )
            {
                const chessInstance   = new Chess();

                const opponenet = waitingPlayers.shift();
                ActiveGame.push({
                    userA: id,
                    userB: opponenet as string ,
                    chessInstance : chessInstance

                })

                Players.forEach( ( wsInstance , localId ) => {
                    if( localId === id || localId === opponenet )
                        wsInstance.send( JSON.stringify({
                            message:"Hello user",
                            connectTo : localId
                        }) )
                })
            }
            else{
                waitingPlayers.push( id );
            }
            console.log("connected")
            console.log( ws );
            console.log( req )
        })
    }

    close( ws: WebSocket ){
        

        })
    }


}


function idge(){
    let id = 0
 return function generateId()
{
   return  ++id;
}

;
}

const generateId = idge();