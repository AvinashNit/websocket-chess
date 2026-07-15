import { WebSocket } from "ws";
import http  from "http";
import { PLAYERS, WAITING_PLAYERS } from "../data/game.data";
import { addToWaiting, createPlayer, upgradeToPlaying } from "../repo/players.repo";
import { closeEvent } from "./close.event";

export const handleConnection = ( _ws : WebSocket ,req: http.ClientRequest ) => {
     const id = generateId();
     console.log( "new connection id assigned as ", id);
     createPlayer( id , _ws );
    
    console.log( "Initially waiting players", WAITING_PLAYERS)
     if( WAITING_PLAYERS.length === 0 )
     {
        
        addToWaiting( id );
     }
     else{
        console.log("after adding ", WAITING_PLAYERS)
        console.log("player", id ,"upgraded to playing")
        upgradeToPlaying( id );
     }
     console.log( "after connected waiting players", WAITING_PLAYERS )
     _ws.on("close", ( ) => {
        console.log("Closing socket")
        closeEvent( _ws )})
        // console.log( WAITING_PLAYERS )

}



















const generateId = () =>  Math.random().toString( 36 ).slice( 2, 10 );