
import { Chess } from "chess.js";
import { create } from "zustand";


interface gameStore {
    gameInstance : Chess,
    fen: string,
    myturn: boolean,
    setFen : ( fen: string  ) => void ,
    setTurn : ( turn:boolean ) => void

}



export const useGameStore = create< gameStore >( ( set, get  ) => {
    const game = new Chess();

    return {

        gameInstance : game,
        fen : game.fen(),
        setFen:  ( fen ) => set ({
            fen : fen 
        }),

        setTurn: ( turn ) => set ({
            
        })
    }
})