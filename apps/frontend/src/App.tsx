import "./output.css"
import {  Routes, Route } from "react-router-dom";
import { Login } from "./pages/LoginPage";
import { Signup } from "./pages/SignupPage";
import { LandingPage } from "./pages/LandingPage";
import { HomePage  } from "./pages/HomePage";
import { Dashboard } from "./components/homepage/Dashboard";
import  Leaderboard  from "./components/homepage/Leaderboard";
import { Players } from "./components/homepage/Player";
import { Board } from "./components/chesscomponent/GameBoard";
import { GuestHomePage } from "./components/guestcomponent/GuestHomepage";
import { useAuthStore } from "./store/auth.store";
import { Navigate } from "react-router-dom";
import { PublicRoute  } from "./PublicRoute";

export function App() {

  const user  =  useAuthStore( state  => state.user );

  return <>
    

      <Routes>
             <Route element= { <PublicRoute></PublicRoute>}>
                <Route path="/" element={<LandingPage></LandingPage>} />
                <Route path="/login" element={<Login></Login>} />
                <Route path="/signup" element={<Signup></Signup>} />
                <Route path="/play-as-guest" element={<GuestHomePage></GuestHomePage>}></Route>
            </Route> 
         
         
        <Route path="/home" element={ user ?  <HomePage /> : <Navigate to="/" replace></Navigate> }>
            <Route index element={<Dashboard />} />
            <Route path="players" element={<Players />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="play-chess" element={ <Board></Board>}></Route>
         </Route>
        

      </Routes>
  
      </>
}
