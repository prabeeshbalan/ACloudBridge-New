"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Declare the type for process.env
declare const process: {
    env: {
      [key: string]: string | undefined;
      NEXT_PUBLIC_BACKEND_URL?: string;
    };
  };
const ChangePasswordPage = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setMessage('New passwords do not match.');
            return;
        }

        try {
            const token = localStorage.getItem('token');

            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
            const response = await fetch(`${backendUrl}/login`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                }),
            });

            if (response.headers.get('content-type')?.includes('application/json')) {
                const data = await response.json();

                if (response.ok) {
                    setMessage('Password updated successfully.');
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmNewPassword('');
                    router.push('/account');
                } else {
                    setMessage(data.message || 'Failed to update password.');
                }
            } else {
                setMessage('An unexpected error occurred. Please try again.');
                console.error('API returned non-JSON response.');
            }

        } catch (error) {
            setMessage('An error occurred. Please try again.');
            console.error('Error updating password:', error);
        }
    };

    return (

            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-blue-900 rounded-lg shadow-lg p-8 w-96">
                    <h2 className="text-white text-2xl font-semibold mb-6">Change Password</h2>

                    {message && <p className="text-red-500 mb-4">{message}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-black text-white"
                                id="currentPassword"
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-black text-white"
                                id="newPassword"
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-black text-white"
                                id="confirmNewPassword"
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>

    );
};

export default ChangePasswordPage;