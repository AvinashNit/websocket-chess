import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { client  } from "@/services/websockt";
import  { Chessboard }  from "react-chessboard";
import { Chess, type Piece } from "chess.js";
import { useGameStore } from "@/store/game.store";
export function Board()
{
    const gameRef =  useRef( new Chess() );
    const fen =  useGameStore( state => state.fen );

    const onDrop = useCallback(  ({ piece, sourceSquare, targetSquare })=>{
        
            
            client.send(JSON.stringify({ event:"move", data: { from: sourceSquare, to: targetSquare }}) );
            return true;
       
    },[])

    useEffect(()=>{
        client.connect();
    },[])

    return <div className="flex justify-center items-center min-h-screen bg-slate-900">
      <div className="w-[95vw] max-w-[700px] aspect-square ">
        <Chessboard  options={ {
          position: fen,
          onPieceDrop : onDrop,
          
        } } >

        </Chessboard>
        </div>
    </div>
}

