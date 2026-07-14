import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { client  } from "@/services/websockt";
import  { Chessboard }  from "react-chessboard";
import { Chess, type Piece } from "chess.js";
export function Board()
{
    const gameRef =  useRef( new Chess() )
    // console.log(gameRef.current.turn())
    // console.log(gameRef.current.moves())
    // console.log( gameRef.current.squareColor("b5"))
    // console.log( gameRef.current.isGameOver(), )
    const [ curFen , setFen ] = useState( gameRef.current.fen() )
    const onDrop = useCallback(({ piece, sourceSquare, targetSquare })=>{
        try{
            const move = gameRef.current.move({
              from: sourceSquare,
              to: targetSquare,
              promotion:"q"
            })
            console.log( move )
            setFen( gameRef.current.fen() )
            return true;
        }
        catch( err )
        {

          console.log( err )
          return false;
        }
    },[])

    useEffect(()=>{
        client.connect();
    },[])

    return <div className="flex justify-center items-center min-h-screen bg-slate-900">
      <div className="w-[95vw] max-w-[700px] aspect-square ">
        <Chessboard  options={ {
          position: curFen,
          onPieceDrop : onDrop,
          
        } } >

        </Chessboard>
        </div>
    </div>
}

