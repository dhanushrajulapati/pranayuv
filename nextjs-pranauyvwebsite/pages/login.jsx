import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import supabase from '../utils/supabaseClient'
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Attempt to log in with Supabase Auth
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Redirect the user after successful login (to dashboard or home page)
      window.location.href = "/dashboard"; // Replace with your desired page
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-sky-100 to-white">
      {/* Animated background blocks */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-sky-200 rounded-full opacity-30"
            style={{
              width: 100,
              height: 100,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -40, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      <motion.div
        className="z-10 backdrop-blur-xl bg-white bg-opacity-60 border-4 border-sky-200 shadow-xl rounded-3xl p-10 w-full max-w-md"
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-sky-900 text-3xl font-bold text-center mb-6">
          Login to Pranayuv
        </h2>
        <form className="space-y-5" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-40 text-sky-900 placeholder-gray-500 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-40 text-sky-900 placeholder-gray-500 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-300"
          />

          <div className="flex items-center space-x-2 text-sky-900">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="w-4 h-4"
            />
            <span className="text-sm">
              I agree to all{" "}
              <a href="#" className="underline text-sky-700">
                terms and conditions
              </a>
            </span>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={!agree || loading}
            className={`w-full bg-sky-600 text-white font-semibold py-2 rounded-xl shadow-md transition-all duration-300 ${
              agree && !loading ? "hover:bg-sky-500" : "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-sky-800 mt-6">
          {"Don't have an account?"}{" "}
          <Link href="/signup" className="underline text-sky-700">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
