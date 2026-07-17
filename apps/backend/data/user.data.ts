

export interface User {
    id: string,
    username:string,
    email:string,
    password:string,
    rating?:number
    totalMathc?:number,
    wins?:number,
    loss?:number,
    draw?:number,
    resign?:number,
    lastGame?: string 
}



export const USERS : User[] = [];


