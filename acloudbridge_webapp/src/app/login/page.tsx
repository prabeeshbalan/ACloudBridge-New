"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST', // Ensure POST method is used
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.email, // Send email as 'username' to match backend
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        window.location.href = '/account'; // Replace with your dashboard route
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(err);
    }
  };

  return (
      <div
        className="min-h-screen flex items-center justify-center bg-gray-900 text-white bg-cover bg-center"
        style={{ backgroundImage: 'url(/login-bg.jpg)', backgroundColor: 'rgba(0, 0, 0, 0)', backgroundBlendMode: 'multiply' }}
      >
        <div className="bg-[#063970] p-8 rounded-lg shadow-md w-112">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign in to aCloudBridge</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-[#251228] focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Email"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-[#251228] focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <a href="#" className="text-blue-500 text-sm">Forgot your Password?</a>
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-sm">Remember me</label>
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {token && <p className="text-green-500">Login successful!</p>}
            <button
              type="submit"
              className="w-full bg-[#67c1e2] text-white py-2 px-4 rounded-md"
            >
              SIGN IN
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm">
              Not signed up yet? <Link href="/signup" className="text-blue-500">SIGN UP NOW</Link>
            </p>
          </div>
        </div>
      </div>

  );
}