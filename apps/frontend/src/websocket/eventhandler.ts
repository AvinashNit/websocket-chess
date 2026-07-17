

interface EventPayload {
    Event : Event,
    payload?: Record< string, unknown > | string 
}

type Event = |"UPDATE_BOARD"
             | "START"
              | "STALEMATE"
              | "CHECKMATE"
              | "YOUR_ID"
            


export function eventHandler( event : EventPayload  ) {

    switch( event.Event ){

        case  "UPDATE_BOARD" :
            updateBoard( event.payload );
            break;
        case  "START" :
            startGame( event.payload );
            break;
        case "STALEMATE" :
            stalemateHandler( event.payload)
            break;
        case "CHECKMATE" :
            handleCheckMate(event.payload);
            break;
        case "YOUR_ID" :
            handleYourId( event.payload );
            break;

    }
}
