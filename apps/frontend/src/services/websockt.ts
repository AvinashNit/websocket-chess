import { useMessage } from "@/store/message.store";

class Websocket{
    private ws: WebSocket | null = null;

    connect()
    {
        if( this.ws )
            return ;

        this.ws = new WebSocket("ws://localhost:3000/ws");
        this.ws.onopen = ()=>{
            console.log("Connected");
        }
        
        this.ws.onmessage = ( message ) =>{
            handleMessage( JSON.parse(message.data.toString()));
        }
    }


    send( message : string  ){
        this.ws?.send( message )
    }

    disconnect()
    {
        this.ws?.close();
    }

}


function handleMessage( message )
{
    if( message.type ===  "postion" )
        setstoe( )
}








export const client = new Websocket();