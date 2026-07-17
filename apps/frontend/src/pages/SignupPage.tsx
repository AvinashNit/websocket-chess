import { Link, useNavigate } from "react-router-dom";
import {
  Crown,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User, ArrowLeft
} from "lucide-react";
import { use, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/api";

const Signup = () => {

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ name, setName ] = useState("");
  const [ isSignUp , setSignUp ] = useState( false )

  const { signup } =  useAuth();

  async function handleclick()
  {
     try{
        setSignUp( true )
        await signup( email.trim(), password.trim(), name.trim() );
        setEmail("");
        setPassword("");
        setName("");
        navigate("/login")
     }
     catch( err )
     {
        setSignUp( false )
        console.log( err )
     }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">

      {/* Left */}

      <div className="hidden lg:flex w-1/2 items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 relative overflow-hidden">

        <div className="absolute w-96 h-96 rounded-full bg-yellow-500/10 blur-3xl"></div>

        <div className="text-center z-10 px-10">

          <div className="w-24 h-24 rounded-full bg-yellow-500 flex items-center justify-center mx-auto mb-8">

            <Crown className="text-slate-900" size={48} />

          </div>

          <h1 className="text-5xl font-bold text-white mb-6">
            Join The Arena
          </h1>

          <p className="text-slate-400 text-lg leading-8 max-w-md mx-auto">

            Create your account, challenge players around the world,
            track your progress and become a chess master.

          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex flex-1 justify-center items-center px-6">

        <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-3xl p-10 shadow-2xl">

        <button
          onClick={() => navigate("/")}
          className="mb-6 flex cursor-pointer items-center gap-2 text-slate-400 transition hover:text-yellow-400"
            >
            <ArrowLeft size={18} />
          <span>Back to Home</span>
          </button>

          <h2 className="text-4xl font-bold text-white mb-2">
            Create Account
          </h2>

          <p className="text-slate-400 mb-8">
            Start playing today.
          </p>

          <form className="space-y-5">

            <div>

              <label className="text-sm text-slate-300">
                Name
              </label>

              <div className="mt-2 flex items-center bg-slate-800 rounded-xl px-4">

                <User size={18} className="text-slate-400" />

                <input
                  placeholder="John Doe"
                  className="flex-1 bg-transparent px-3 py-4 outline-none text-white"
                  value={name}
                  onChange={( e )=>{
                    setName( e.target.value )
                  }}
                />

              </div>

            </div>

            <div>

              <label className="text-sm text-slate-300">
                Email
              </label>

              <div className="mt-2 flex items-center bg-slate-800 rounded-xl px-4">

                <Mail size={18} className="text-slate-400" />

                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 bg-transparent px-3 py-4 outline-none text-white"
                  value={ email }
                  onChange={( e )=>{
                    setEmail( e.target.value )
                  }}
                />

              </div>

            </div>

            <div>

              <label className="text-sm text-slate-300">
                Password
              </label>

              <div className="mt-2 flex items-center bg-slate-800 rounded-xl px-4">

                <Lock size={18} className="text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="flex-1 bg-transparent px-3 py-4 outline-none text-white"
                  value={password}
                  onChange={( e )=>{
                    setPassword( e.target.value )
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="text-slate-400" />
                  ) : (
                    <Eye className="text-slate-400" />
                  )}
                </button>

              </div>

            </div>

            <button onClick={ handleclick }
              className="w-full py-4 rounded-xl bg-yellow-500 hover:bg-yellow-400 transition font-bold text-slate-900"
            >
              Create Account
            </button>

          </form>

          <div className="mt-8 text-center text-slate-400">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-yellow-400 font-semibold hover:text-yellow-300"
            >
              Login
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export { Signup };