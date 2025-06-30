import React from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 px-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Left Side Illustration */}
        <div className="hidden md:flex items-center justify-center ">
          <img
            src="/images/job/4957136.jpg" // Replace with your SVG or image path
            alt="Login Illustration"
            className="w-80 h-auto"
          />
        </div>

        {/* Right Side Form */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome Back!
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Login to your account to find or post jobs effortlessly.
          </p>

          <form className="space-y-4">
            {/* Email */}
            <div className="relative">
              <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>

            {/* Forgot Password & Signup */}
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <Link to="/forgot-password" className="hover:underline">
                Forgot Password?
              </Link>
              <Link to="/register" className="hover:underline">
                Create an Account
              </Link>
            </div>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-2 text-sm text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Social Login (Optional) */}
          {/* <div className="flex flex-col gap-3">
            <button className="border border-gray-300 py-2 rounded-md flex items-center justify-center hover:bg-gray-100 transition">
              <img
                src="/google-icon.png"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Continue with Google
            </button>
            <button className="border border-gray-300 py-2 rounded-md flex items-center justify-center hover:bg-gray-100 transition">
              <img
                src="/facebook-icon.png"
                alt="Facebook"
                className="w-5 h-5 mr-2"
              />
              Continue with Facebook
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
