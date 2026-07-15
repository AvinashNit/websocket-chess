import type { Chess } from "chess.js";
import { WebSocket } from "ws"

export type Players  = Map< string , WebSocket >


export type WaitingPlayers  =  string[];


export type ActiveGame  =  {
    userA : string,
    colorA : string,
    userB: string,
    instanceId : Chess
}[]