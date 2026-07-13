import express from "express";
import cors from "cors";
const app = express();

app.use( express.json() );


app.use( cors() );




const server  = app.listen( 3000, ()=>{
    console.log(`server runnig over http://localhost:3000`)
} )