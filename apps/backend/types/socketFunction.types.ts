import http from "http";
import { WebSocket } from "ws";

export type handleConnection = ( ws: WebSocket, req: http.ClientRequest ) => void ;


export type closeFunction = ( ws : WebSocket ) => void ;


export type handleMessage  = ( ws: WebSocket , message:JSON ) => void ;


export type sendMessage  = ( ws: WebSocket , message: string ) => void ;