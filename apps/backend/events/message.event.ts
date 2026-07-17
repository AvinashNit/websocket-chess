import { Chess } from "chess.js";
import { sendMoveUpdateMessage , sendError  } from "./server.message.event";
import WebSocket from "ws";
import { ACTIVE_GAMES } from "../data/game.data";
import { getGame, getPlayerId, getPlayerSocket } from "../repo/players.repo";
import * as jwt from "jsonwebtoken";

export type message  = {
    event:messageType
    data ?: Record< string, string >
}


export type messageType = "start" | "move" |"test" |"play-as-guest"

export const handleIncomingMessage = ( { message, ws}:{ message: string , ws: WebSocket }) => {

    const parsedMessage = JSON.parse( message ) as message;
    
    if( parsedMessage.event === "move" ){

        if( parsedMessage.data === undefined )
               return  sendError( ws );

        //extract id from players map based on websocket object
        const id = getPlayerId( ws );

        if( id == undefined )
            return;
        //get the game instance of the player
        const game = getGame( id );        
        // player is waiting
        if( game === undefined )
            return;

        //get the legal turn 
        
        const turn = game.instanceId.turn();

        // check  move is made by correct player
        if( turn === "w" && game.userB === id )
            return;

        if( turn === "b"  && game.userA === id )
            return;

        let opponentSocket  : WebSocket | undefined 

        //check if the current player is referred as userA
        const isIdofA = game.userA === id ? true : false;

        if( id === game.userA )
        {
            opponentSocket = getPlayerSocket( game.userB );

        }
        else
            opponentSocket = getPlayerSocket( game.userA );

        if( opponentSocket ===  undefined )
            return;


        try{

            const fen = validateMove( {
                from: parsedMessage.data.from as string,
                to: parsedMessage.data.to as string,
                chessInstance: game.instanceId,
                
            })
            if( fen === undefined )
                return;

            

            sendMoveUpdateMessage( ws, fen , isIdofA ? false : true   );
            sendMoveUpdateMessage( opponentSocket!,fen , isIdofA ? true : false );
            
        }
        catch( err  )
        {
            sendError( ws  )
        }
    }

    if( parsedMessage.event === "play-as-guest")
    {
        console.log('got message to start game as a guest ')
            ws.send( JSON.stringify({
                event:"yourId",
                token :   jwt.sign({id:crypto.randomUUID},"secretKey")
            }))
    }

    

}



export function validateMove( {
    from, to ,chessInstance
}:{ from: string, to: string , chessInstance:Chess })
{
    
    try {
        const move  = chessInstance.move({
            from,
            to
        })
        if( move )
            return chessInstance.fen();
    }
    catch( err )
    {
         throw new Error( "Invalid move")
    }
}



