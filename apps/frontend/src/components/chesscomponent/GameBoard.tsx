import { useEffect, useMemo, useState } from "react";
import { client  } from "@/services/websockt";
import  { Chessboard }  from "react-chessboard";
import { Chess } from "chess.js"
export function Board()
{
    const game  =  new Chess();


    const options = useMemo(()=>({

        position: ,

        onPieceDrop: ({ sourceSquare, targetSquare, piece }) => {
        
        console.log({
            sourceSquare,
            targetSquare,
            piece,
        });

        return true;
    },
}),[ ])


    useEffect(()=>{
        client.connect();
    },[])

    return <div className="flex justify-center items-center min-h-screen bg-slate-900">
        <Chessboard options={ options } >

        </Chessboard>
    </div>
}