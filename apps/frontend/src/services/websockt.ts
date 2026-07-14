interface message  {
    event: string,
    data?: Record< string, unknown > | string 
}

import { useGameStore } from "@/store/game.store";



class Websocket{
    private ws : WebSocket | null = null; 

    connect()
    {
        if( this.ws )
            return ;

        this.ws = new WebSocket("ws://localhost:3000/ws");
        this.ws.onopen = ()=>{
            console.log("Connected");
        }
        
        this.ws.onmessage = ( message ) =>{
            this.handleMessage( JSON.parse( message.data.toString() ));

        }
    }

    handleMessage( message : message ){
        if( message.event === "update")
            useGameStore.getState().setFen( message.data as string )

    }

    send( message : string   ){
        this.ws?.send( message )
    }

    disconnect()
    {
        this.ws?.close();
    }

}


export const client = new Websocket();