import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Crown,ArrowLeft } from "lucide-react";
import { useState } from "react";

const Login = () => {
  const navigate =  useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 overflow-hidden">

        <div className="absolute w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>

        <div className="z-10 text-center px-10">

          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-yellow-500 flex items-center justify-center shadow-2xl">
              <Crown size={48} className="text-slate-900" />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome Back
          </h1>

          <p className="text-slate-400 text-lg leading-8 max-w-md mx-auto">
            Continue your chess journey, challenge players worldwide,
            improve your rating, and climb the leaderboard.
          </p>

        </div>
      </div>

      {/* Right Section */}

      <div className="flex flex-1 items-center justify-center px-6">

        <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 shadow-2xl">
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex cursor-pointer items-center gap-2 text-slate-400 transition hover:text-yellow-400"
            >
            <ArrowLeft size={18} />
          <span>Back to Home</span>
        </button>
          <h2 className="text-4xl font-bold text-white mb-2">
            Login
          </h2>

          <p className="text-slate-400 mb-8">
            Sign in to your account.
          </p>

          <form className="space-y-6">

            <div>
              <label className="text-slate-300 text-sm">
                Email
              </label>

              <div className="mt-2 flex items-center bg-slate-800 rounded-xl px-4">
                <Mail className="text-slate-400" size={18} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent flex-1 px-3 py-4 outline-none text-white"
                  value={ email }
                  onChange={(e)=>{
                    setEmail( e.target.value )
                  }}
                />
              </div>
            </div>

            <div>

              <label className="text-slate-300 text-sm">
                Password
              </label>

              <div className="mt-2 flex items-center bg-slate-800 rounded-xl px-4">

                <Lock className="text-slate-400" size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="bg-transparent flex-1 px-3 py-4 outline-none text-white"
                  value={password}
                  onChange={ ( e )=>{
                    setPassword( e.target.value )
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="text-slate-400" size={20} />
                  ) : (
                    <Eye className="text-slate-400" size={20} />
                  )}
                </button>

              </div>

            </div>

            <div className="flex justify-between items-center text-sm">

              <label className="flex items-center gap-2 text-slate-300">
                <input type="checkbox" />
                Remember me
              </label>

              <button
                type="button"
                className="text-yellow-400 hover:text-yellow-300"
              >
                Forgot Password?
              </button>

            </div>

            <button
              className="w-full py-4 rounded-xl bg-yellow-500 hover:bg-yellow-400 transition font-bold text-slate-900"
            >
              Login
            </button>

          </form>

          <div className="mt-8 text-center text-slate-400">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="text-yellow-400 hover:text-yellow-300 font-semibold"
            >
              Sign Up
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export { Login };