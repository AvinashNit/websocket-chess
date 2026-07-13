import { create } from "zustand";


export const useMessage = create(( set ) => ({
    messages : [],

    setmessages : ( message ) => set( ( state )=>
        ({
        messages: [...state.messages ,message ]
    }))
}))