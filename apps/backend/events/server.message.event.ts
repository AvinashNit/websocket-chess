import { WebSocket } from "ws";


export function sendMoveUpdateMessage( ws: WebSocket , data: string  ){
    ws.send( JSON.stringify( {
        event:"update-board",
        data: {
            move: data
        }
    }))
}





export function sendError( ws: WebSocket , message?: string )
{
    ws.send( JSON.stringify({
        event:"error",
        data:{
            message : message ? message : "Something went wrong "
        }
    }))
}