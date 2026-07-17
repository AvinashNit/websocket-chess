

import { eventHandler } from "@/websocket/eventhandler";




class Socket {
    private socket : WebSocket ;
    constructor( URL: string )
    {
        this.socket = new WebSocket( URL );

        this.socket.onopen = () =>{
            console.log("Connected")
        }

        this.socket.onclose = () =>{
            console.log("Closed")
        }

        this.socket.onmessage = ( event  ) =>{
            const parsedEvent = JSON.parse( event.data.toString() );
            eventHandler( parsedEvent )
        }

        
    }

    emitEvent( event: string )
    {
        this.socket.send( event );
    }

    close(){
        this.socket.close();
    }


    
}






export const socketClient = new Socket("ws://localhost:4000/ws");