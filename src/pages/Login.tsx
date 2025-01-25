import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      // Redirect to dashboard on success
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-xl font-semibold text-center text-[#a32e76] mb-6">
            Welcome Back to LifeCourse Experts!
          </h2>
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email ID"
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-xl px-4 py-3 border-gray-200"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-xl px-4 py-3 border-gray-200"
            />
            <Button
              type="submit"
              fullWidth
              className="bg-[#a32e76] hover:bg-[#821e5e] text-white rounded-xl py-3"
            >
              Login
            </Button>
          </form>
          <div className="mt-4 flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-[#a32e76] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex items-center justify-center text-xl">
              <span className="bg-white px-2 text-gray-500 justify-center">or</span>
            </div>
          </div>
          <div className="mt-6">
            <Button
              variant="google"
              fullWidth
              className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 rounded-xl py-3 flex items-center justify-center"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Continue with Google
            </Button>
          </div>
          <p className="text-center text-sm mt-6">
            New to LifeCourse Experts?{" "}
            <Link
              to="/register"
              className="text-[#a32e76] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
