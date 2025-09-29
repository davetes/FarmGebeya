"use client";

import React from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // TODO: connect to your API route, e.g., POST /api/register
      // await fetch("/api/register", { method: "POST", body: JSON.stringify({ fullName, email, password }) });
      console.log("Register:", { fullName, email });
      // For now, just redirect to login
      window.location.href = "/controller/login";
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Sign up</h1>
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-red-700 text-sm">
            {error}
          </div>
        )}
        {/* fullname */}
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your full name"
            autoComplete="name"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />
        </div>
        {/* email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />
        </div>

        {/* password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1 flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-pink-300">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              autoComplete="new-password"
              className="w-full border-none focus:outline-none bg-transparent"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        {/* confirm password */}
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm password</label>
          <div className="mt-1 flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-pink-300">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              className="w-full border-none focus:outline-none bg-transparent"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        {/* submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2.5 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* sign-in link */}
        <div className="flex items-center justify-center mt-4 text-sm">
          <Link href={"/controller/login"} className="text-pink-600 hover:underline">
            Already have an account? Sign in
          </Link>
        </div>

        {/* divider */}
        <div className="flex items-center justify-center my-4 text-sm text-gray-500">
          <hr className="flex-grow border-gray-200" />
          <span className="mx-4">or continue with</span>
          <hr className="flex-grow border-gray-200" />
        </div>

        {/* social icons */}
        <div className="flex space-x-4">
          <div className="flex-1 flex justify-center">
            <a href="https://www.google.com" target="_blank" rel="noreferrer">
              <Image src="/google-icon.svg" alt="google" height={50} width={50} />
            </a>
          </div>
          <div className="flex-1 flex justify-center">
            <Image src="/facebook.svg" alt="facebook" height={50} width={50} />
          </div>
          <div className="flex-1 flex justify-center">
            <Image src="/x-icon.svg" alt="twitter" height={50} width={50} />
          </div>
          <div className="flex-1 flex justify-center">
            <Image src="/apple-icon.svg" alt="apple" height={50} width={50} />
          </div>
        </div>
      </form>
    </div>
  );
};
export default page;
