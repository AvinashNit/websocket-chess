import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import  { Chess }  from "chess.js"

type chess = typeof Chess;


const Players : Map< string, WebSocket > = new Map();

const waitingPlayers :string[] = [];

const ActiveGame :{
    userA: string,
    userB: string,
    chessInstance : Chess
}[] = [];


export class Websocketserver{
    private  wsserver : WebSocketServer 

    constructor( httpServer : http.Server )
    {
        this.wsserver = new WebSocketServer({
            server:httpServer,
            path:"/ws"
        });

        this.handleConnection()
    }

    handleConnection(){
        this.wsserver?.on("connection", ( ws: WebSocket , req: http.ClientRequest )=>{
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
                    if(  localId === opponenet )
                        wsInstance.send( JSON.stringify({
                            message:"Hello champ",
                            ["Your opponenet"] : id
                        }) )
                    ws.send( JSON.stringify({
                        message:"Hello Champ ",
                        ["Your Opponent"]: opponenet
                    }))
                })
            }
            else{
                waitingPlayers.push( id );
            }
            
            ws.on("close", ()=>{
                console.log( "deleting player " , id )
                Players.delete( id );
                let index = waitingPlayers.findIndex( ( player ) =>  player === id )
                if( index >= 0)
                {
                    waitingPlayers.splice( index,1 );
                }
                index = ActiveGame.findIndex( game => game.userA === id ||  game.userB === id );
                if( index >=0 )
                {
                    const gameM = ActiveGame[ index ];
                    if( gameM?.userA !== id )
                        waitingPlayers.push( gameM!.userA )
                    else
                        waitingPlayers.push( gameM.userB );

                    ActiveGame.splice(index,1);
                }
                    
            })

            ws.on("message", ( message ) => this.handleMessage( id , JSON.parse( message.toString() ) as { event: string, 
                data?: string | Record< string, unknown >
            } ) )
          
           
        })
    }

    
    private handleMessage( id: string , message:{ event: string, data?: string | Record< string, unknown> }  ){
            if( message.event === "move" )
            {
                const data  =  message.data as Record< string, unknown >;

                const gameData = ActiveGame.find( game => game.userA === id  || game.userB === id )
                const userASocket = Players.get( gameData!.userA );
                const userBSocket = Players.get( gameData!.userB );
                const moved = gameData?.chessInstance.move(
                    {
                        from: data.from as string,
                        to: data.to as string
                    }
                )
                userASocket!.send( JSON.stringify({ event:"update", data: gameData?.chessInstance.fen() }));
                userBSocket!.send( JSON.stringify({ event:"update", data:gameData?.chessInstance.fen()}));
            }

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