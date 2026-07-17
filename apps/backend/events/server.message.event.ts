import { WebSocket } from "ws";


export function sendMoveUpdateMessage( ws: WebSocket , movedata: string , myturn: boolean   ){
    ws.send( JSON.stringify( {
        event:"update-board",
        data: {
            move: movedata,
            myturn:myturn
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