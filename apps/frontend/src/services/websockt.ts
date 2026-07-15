interface message  {
    event: string,
    data?: Record< string, string >
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
            this.handleMessage( JSON.parse( message.data ));

        }
    }

    handleMessage( message : message ){
        if( message.event === "update-board" )
        {
            if( message.data === undefined )
                return;

            useGameStore.getState().setFen( message.data.move as string );
        }

        if( message.event === "eventId" )
        {
            const data  =  message.data as {
                id: string 
            }
            console.log( data.id )
        }

        if( message.event === "start" )
        {
            const data =  message.data as {
                message: string
            }
            console.log( data.message );
        }

        if( message.event === "error" )
        {
            console.log( "Error from server ", message.data!.error as string )
        }

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