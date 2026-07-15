import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import  { Chess }  from "chess.js"



const Players : Map< string, WebSocket > = new Map();

const waitingPlayers :string[] = [];

const ActiveGame :{
    whitePlayer: string,
    blackPlayer: string,
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

            console.log("new connection ")

            ws.send( JSON.stringify({
                event:"startId",
                data:{
                    id
                }
            }))
            if( waitingPlayers.length != 0 )
            {
                const chessInstance   =  new Chess();
                console.log("waiting players", waitingPlayers );
                const opponenet = waitingPlayers.shift();
                console.log("forming team with ", id, opponenet );
                console.log( "waiting players" , waitingPlayers )
                ActiveGame.push({
                    whitePlayer: id,
                    blackPlayer: opponenet as string ,
                    chessInstance : chessInstance

                })

                //get the opponent from websocket from map
                Players.forEach( ( wsInstance , localId ) => {
                    if(  localId === opponenet )
                        wsInstance.send( JSON.stringify({
                            event:"start",
                            data:{
                                message:`You got opponent as ${ id }`
                            }
                        }) )

                // console.log("opponent gets chess reference ", chessInstance );
                    
                // current player gets opponent
                    ws.send( JSON.stringify({
                        event:"start",
                        data:{
                            message:`you got opponent as ${ opponenet }`
                        }
                    }))

                    // console.log( "current player gets chess reference ", chessInstance );
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
                index = ActiveGame.findIndex( game => game.whitePlayer === id ||  game.blackPlayer === id );
                if( index >=0 )
                {
                    const gameM = ActiveGame[ index ];
                    if( gameM?.whitePlayer !== id )
                        waitingPlayers.push( gameM!.whitePlayer )
                    else
                        waitingPlayers.push( gameM.blackPlayer );

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

                const gameData = ActiveGame.find( game => game.whitePlayer === id  || game.blackPlayer === id )
                const userASocket = Players.get( gameData!.whitePlayer );
                const userBSocket = Players.get( gameData!.blackPlayer );
                const turn  =  gameData?.chessInstance.turn();
                if( turn ==='w' && id !== gameData?.whitePlayer )
                    return;
                if( turn === 'b' && id !== gameData?.blackPlayer )
                    return;

                try{
                    

                    const moved = gameData?.chessInstance.move(
                    {
                        from: data.from as string,
                        to: data.to as string
                    }
                )

                userASocket!.send( JSON.stringify({ event:"update", data: gameData?.chessInstance.fen() }));
                userBSocket!.send( JSON.stringify({ event:"update", data:gameData?.chessInstance.fen()}));
            }
            catch( err )
            {
                console.log( err )
            }

            }

    }


   
   

}


function id(){
    let id = 0
 return function generateId()
{
   return  ++id;
}

;
}

const generateId = id();