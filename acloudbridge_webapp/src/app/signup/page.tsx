"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '@/app/layout';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/register', { // Replace with your backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(err);
    }
  };

  return (

      <div
        className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white bg-cover bg-center"
        style={{ backgroundImage: 'url(/signup-bg.jpg)' }}
      >
        <div className="bg-[#063970] p-8 rounded-lg shadow-md w-112">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-[#a4fcfe] focus:outline-none focus:ring focus:ring-blue-500 text-[#1a4f6e]"
                placeholder="First Name"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-[#a4fcfe] focus:outline-none focus:ring focus:ring-blue-500 text-[#1a4f6e]"
                placeholder="Last Name"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-[#a4fcfe] focus:outline-none focus:ring focus:ring-blue-500 text-[#1a4f6e]"
                placeholder="Email Address"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-[#a4fcfe] focus:outline-none focus:ring focus:ring-blue-500 text-[#1a4f6e]"
                placeholder="Password"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-[#a4fcfe] focus:outline-none focus:ring focus:ring-blue-500 text-[#1a4f6e]"
                placeholder="Confirm Password"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Registration successful!</p>}
            <button
              type="submit"
              className="w-full bg-[#67c1e2] text-white py-2 px-4 rounded-md"
            >
              SIGN UP
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account? <Link href="/login" className="text-blue-500">LOGIN</Link>
            </p>
          </div>
        </div>
      </div>

  );
}