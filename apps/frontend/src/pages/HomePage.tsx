import { Navbar } from "@/components/navbar/Navbar";
import  { Routes, Route, Outlet } from "react-router-dom";


export function HomePage()
{
    return <div>
        <Navbar></Navbar>
        <div className="pt-16">
        <Outlet></Outlet>
        </div>
        
    </div>
}