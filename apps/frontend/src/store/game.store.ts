import { create } from "zustand";

interface gameStore {
    cposition: string,
    setcpositon : ( pos : string ) => void 
}


const useGameStore = create< gameStore >(( set )=> ({
    cposition: "",
    setcpositon : ( pos )=> set(({ cposition :pos   }))
}))



