"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface User {
    name: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

export default function AccountPage() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        async function fetchUserData() {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            if (token) {
                try {
                    const response = await fetch('http://localhost:5000/user', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const userData = await response.json();
                        console.log('User data:', userData);
                        console.log('User Name:', userData.name);
                        console.log('User First Name:', userData.firstName);
                        console.log('User Last Name:', userData.lastName);

                        if (userData.firstName && userData.lastName) {
                            userData.name = `${userData.firstName} ${userData.lastName}`;
                        }

                        setUser(userData);
                    } else {
                        console.error('Failed to fetch user data');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        }

        fetchUserData();
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    const handleDeactivate = async () => {
        if (window.confirm('Are you sure you want to deactivate your account?')) {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch('http://localhost:5000/deactivate', {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        localStorage.removeItem('token');
                        router.push('/login');
                        alert('Account deactivated successfully.');
                    } else {
                        alert('Failed to deactivate account.');
                    }
                } catch (error) {
                    console.error('Error deactivating account:', error);
                    alert('An error occurred while deactivating the account.');
                }
            }
        }
    };

    return (
        <div className="flex justify-end w-full mt-4">
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                    <FaUser className="text-[#64FFDA] text-lg" />
                    <div className="relative">
                        <button 
                            className="text-[#64FFDA] font-semibold hover:bg-[#112240] px-4 py-2 rounded-full transition-colors duration-200"
                            onClick={toggleDropdown}
                        >
                            My Account
                        </button>
                        {isDropdownOpen && (
                            <div
                                ref={dropdownRef}
                                className="absolute right-0 mt-2 w-60 bg-[#112240] rounded-md shadow-lg z-10 border border-[#64FFDA]"
                            >
                                {user && (
                                    <div className="p-4 border-b border-[#64FFDA] flex items-center">
                                        <FaUserCircle className="mr-2 text-5xl text-[#64FFDA]" />
                                        <div className="flex flex-col">
                                            <div className="font-semibold text-[#64FFDA]">{user.name}</div>
                                            <div className="text-sm text-gray-300">{user.email}</div>
                                        </div>
                                    </div>
                                )}
                                <a 
                                    href="/profile" 
                                    className="block px-4 py-2 text-sm text-[#64FFDA] hover:bg-[#0A192F] transition-colors duration-200"
                                >
                                    Profile
                                </a>
                                <button
                                    onClick={handleDeactivate}
                                    className="block px-4 py-2 text-sm text-[#64FFDA] hover:bg-[#0A192F] w-full text-left transition-colors duration-200"
                                >
                                    Deactivate Account
                                </button>
                                <a
                                    href="/changepassword"
                                    className="block px-4 py-2 text-sm text-[#64FFDA] hover:bg-[#0A192F] transition-colors duration-200"
                                >
                                    Change Password
                                </a>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <FaLock className="text-[#64FFDA] text-lg" />
                    <button 
                        className="text-[#64FFDA] font-semibold hover:bg-[#112240] px-4 py-2 rounded-full transition-colors duration-200"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}