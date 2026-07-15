import { Chess } from "chess.js";
import { sendMoveUpdateMessage , sendError  } from "./server.message.event";
import WebSocket from "ws";
import { ACTIVE_GAMES } from "../data/game.data";
import { getGame, getPlayerId, getPlayerSocket } from "../repo/players.repo";


export type message  = {
    event:messageType
    data ?: Record< string, string >
}


export type messageType = "start" | "move" |"test"

export const handleIncomingMessage = ( { message, ws}:{ message: string , ws: WebSocket }) => {

    const parsedMessage = JSON.parse( message ) as message;
    
    if( parsedMessage.event === "move" ){

        if( parsedMessage.data === undefined )
               return  sendError( ws );

        const id = getPlayerId( ws );

        if( id == undefined )
            return;

        const game = getGame( id );        

        if( game === undefined )
            return;

        const turn = game.instanceId.turn();

        if( turn === "w" && game.userB === id )
            return;

        if( turn === "b"  && game.userA === id )
            return;

        let opponentSocket  : WebSocket | undefined 

        if( id === game.userA )
            opponentSocket = getPlayerSocket( game.userB );
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

            sendMoveUpdateMessage( ws, fen );
            sendMoveUpdateMessage( opponentSocket!,fen );
            
        }
        catch( err  )
        {
            sendError( ws  )
        }
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



