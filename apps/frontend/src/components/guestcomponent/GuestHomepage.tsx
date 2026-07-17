import { client } from "@/services/websocket.service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"



export function GuestHomePage()
{
    useEffect(()=>{
        client.connect();
    },[])
    const navigate = useNavigate();
    const  handleclick = () =>{
        navigate("/home/play-chess")
    }
    return <div className="bg-slate-900 min-h-screen text-white">
            <div className="mx-auto max-w-7xl p-8 border  border-slate-800 ">

                <div className=" grid-cols-1 lg:grid-cols-2 rounded-3xl border justify-around items-center  border-slate-700 ">
                        <button className="px-10 py-3 bg-slate-600 hover:border-amber-300 cursor-pointer" onClick={ handleclick }> challenge </button>
                        <button className="px-10 py-3 bg-slate-600 hover:border-amber-300 cursor-pointer" onClick={ handleclick }> challenge </button>
                        <button className=" border px-10 py-3 bg-slate-600 hover:border-amber-300 cursor-pointer" onClick={ handleclick }> challenge </button>
                </div>

            </div>
    </div>
}