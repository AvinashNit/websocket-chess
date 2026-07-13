import "./output.css"
import {  Routes, Route } from "react-router-dom";
import { Login } from "./pages/LoginPage";
import { Signup } from "./pages/SignupPage";
import { LandingPage } from "./pages/LandingPage";
import { HomePage  } from "./pages/HomePage";
import { Dashboard } from "./components/homepage/Dashboard";
import  Leaderboard  from "./components/homepage/Leaderboard";
import { Players } from "./components/homepage/Player";
export function App() {
  return <>
    
     

      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/signup" element={<Signup></Signup>} />
        <Route path="/home" element={<HomePage />}>
            <Route index element={<Dashboard />} />
            <Route path="players" element={<Players />} />
            <Route path="leaderboard" element={<Leaderboard />} />
         </Route>
        
      </Routes>
  
      </>
}
