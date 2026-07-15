import { ACTIVE_GAMES, PLAYERS, WAITING_PLAYERS } from "../data/game.data";
import { WebSocket } from "ws";
import { Chess } from "chess.js";

export const getPlayerId  = ( _ws: WebSocket ) =>{
   
    for( const [ id, socket  ] of PLAYERS ){
        if( socket ===  _ws )
            return id;
    }
    return undefined;
}

export const getPlayerSocket = ( _id : string ) =>{
    for(  const [ id, socket  ] of PLAYERS )
    {
        if( id === _id )
            return socket;
    }
}

export const createPlayer = ( id: string, ws: WebSocket ) =>{
    PLAYERS.set( id, ws );
}

export const deletePlayer = ( id : string ) =>{
    PLAYERS.delete( id );
}

export const addToWaiting = ( id : string ) =>{
    WAITING_PLAYERS.push( id );
}

export const  upgradeToPlaying = ( _id : string  ) => {
    const id  =  WAITING_PLAYERS.shift();
    if( id === undefined )
        return;
    const game  = addGame( _id, "w",  id );

}


export const deletePlayerFromWaiting = ( id : string  ) => {
    const index = WAITING_PLAYERS.findIndex( player_id => player_id ===id )
    if( index < 0 )
        return;

    const player = WAITING_PLAYERS.splice( index, 1 );
    return player[0];
}


export const isPlayerInGame = ( id : string  )=>{
    const index  =  ACTIVE_GAMES.findIndex( game => game.userA === id || game.userB === id );
    return index;
}

export const abortGame  = ( id: string  ) => {
    const index  =  isPlayerInGame( id );
    if( index < 0 )
        return undefined;
    const game =  ACTIVE_GAMES.splice( index, 1 );
    return game[0];
}


export const addGame  = ( userA: string, colorA : string, userB: string ) =>{
    ACTIVE_GAMES.push({
        userA,
        userB,
        colorA,
        instanceId: new Chess()
    })
}



export const getGame = ( id: string ) =>{
    const game  =  ACTIVE_GAMES.find(  game => game.userA ===id || game.userB === id )
    return game;
}