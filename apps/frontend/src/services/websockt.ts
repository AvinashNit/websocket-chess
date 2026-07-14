
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
            this.handleMessage( JSON.parse( message.data.toString() ));

        }
    }

    handleMessage( message : string ){
        console.log( message )
    }

    send( message : string  ){
        this.ws?.send( message )
    }

    disconnect()
    {
        this.ws?.close();
    }

}


export const client = new Websocket();