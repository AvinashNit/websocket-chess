import { WebSocket } from "ws";
import http  from "http";
import { PLAYERS, WAITING_PLAYERS } from "../data/game.data";
import { addToWaiting, createPlayer, upgradeToPlaying } from "../repo/players.repo";
import { closeEvent } from "./close.event";
import { handleIncomingMessage } from "./message.event";

export const handleConnection = ( _ws : WebSocket ,req: http.ClientRequest ) => {
     const id = generateId();
     
     createPlayer( id , _ws );
    
    
     if( WAITING_PLAYERS.length === 0 )
     {
        
        addToWaiting( id );
     }
     else{
       
       
        upgradeToPlaying( id );
     }
     

     _ws.onmessage = ( message  ) => {
         handleIncomingMessage({ message:  message.data.toString() , ws: _ws })
     }


     _ws.on("close", ( ) => {
       
        closeEvent( _ws )})
        // console.log( WAITING_PLAYERS )

}



















const generateId = () =>  Math.random().toString( 36 ).slice( 2, 10 );