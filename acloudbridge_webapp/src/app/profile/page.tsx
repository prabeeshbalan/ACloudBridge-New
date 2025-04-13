"use client";

import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // Import useRouter

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:5000/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setEditedUser(userData);
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (token && editedUser) {
      try {
        const response = await fetch('http://localhost:5000/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedUser),
        });
        if (response.ok) {
          setUser(editedUser);
          setIsEditing(false);
          alert('Profile updated successfully!');
          router.push('/account'); // Redirect to account page after save
        } else {
          console.error('Failed to update user data');
          alert('Failed to update profile.');
        }
      } catch (error) {
        console.error('Error updating user data:', error);
        alert('An error occurred while updating the profile.');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleExit = () => {
    router.push('/account'); // Redirect to account page
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading profile...</p>
        </div>
      </Layout>
    );
  }

  return (

      <div className="min-h-screen flex flex-col items-center p-8">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="bg-white rounded-lg shadow p-6 w-full max-w-md flex flex-col items-center">
          <div className="flex justify-between w-full">
            <div className="flex justify-center w-full">
              <FaUserCircle className="text-7xl text-gray-700 mt-2" />
            </div>
            {user && !isEditing && (
              <button
                onClick={handleEdit}
                className="bg-green-500 text-white p-2 text-sm rounded ml-2 w-32 h-10"
              >
                Edit Profile
              </button>
            )}
          </div>
          <div className="w-full">
            {isEditing ? (
              <>
                <div className="flex mb-2">
                  <strong className="text-gray-700 w-32">First Name:</strong>
                  <input
                    type="text"
                    name="first_name"
                    value={editedUser?.first_name || ''}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                </div>
                <div className="flex mb-2">
                  <strong className="text-gray-700 w-32">Last Name:</strong>
                  <input
                    type="text"
                    name="last_name"
                    value={editedUser?.last_name || ''}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                </div>
                <div className="flex mb-2">
                  <strong className="text-gray-700 w-32">Email:</strong>
                  <input
                    type="email"
                    name="email"
                    value={editedUser?.email || ''}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                </div>
                <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">
                  Save
                </button>
              </>
            ) : (
              <>
                <div className="flex mb-2">
                  <strong className="text-gray-700 w-32">First Name:</strong>
                  <p className="text-gray-900">{user.first_name || 'N/A'}</p>
                </div>
                <div className="flex mb-2">
                  <strong className="text-gray-700 w-32">Last Name:</strong>
                  <p className="text-gray-900">{user.last_name || 'N/A'}</p>
                </div>
                <div className="flex mb-2">
                  <strong className="text-gray-700 w-32">Email:</strong>
                  <p className="text-gray-900">{user.email || 'N/A'}</p>
                </div>
              </>
            )}
          </div>
          <button onClick={handleExit} className="bg-gray-500 text-white p-2 rounded mt-4">
            Exit
          </button>
        </div>
      </div>

  );
};

export default ProfilePage;