
import { Chess } from "chess.js";
import { create } from "zustand";


interface gameStore {
    gameInstance : Chess,
    fen: string,
    setFen : ( fen: string  ) => void ,
    

}



export const useGameStore = create< gameStore >( (set) => {
    const game = new Chess();

    return {

        gameInstance : game,
        fen : game.fen(),
        setFen:  ( fen ) => set ({
            fen : fen 
        }),

        
    }
})