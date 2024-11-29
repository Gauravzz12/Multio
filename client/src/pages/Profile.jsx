import React from 'react';
import { selectCurrentUser } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';

function Profile() {
  const user = useSelector(selectCurrentUser);
  return (
    <main className="flex flex-col min-h-screen bg-gray-900">
      <header className="p-4">
        <h1 className="text-white text-6xl">Welcome {user}</h1>
      </header>
      {/* Add any additional content here */}
    </main>
  );
}

export default Profile;