import { WebSocket } from "ws";
import type { closeFunction  } from "../types/socket.utility.types";
import { abortGame, addToWaiting, deletePlayer, deletePlayerFromWaiting, getPlayerId, isPlayerInGame } from "../repo/players.repo";

export const closeEvent : closeFunction = ( ws: WebSocket )=>{
    const id = getPlayerId( ws );
    if( id === undefined )
        return;
    
    deletePlayer( id );

    const isPlaying  =  isPlayerInGame( id );

    if( !isPlaying )
    {
        deletePlayerFromWaiting( id );
        return;
    }
    
    else 
    {
      let game = abortGame( id );
      if( game )
      {
            if( game.userA === id )
                addToWaiting( game.userB )
            else if( game.userB === id )
                addToWaiting( game.userA );
      }
        
    }

    

    }

