import React from 'react';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const { user } = useAuth();
  console.log("User:", user);

  return (
    <div className='flex justify-between items-center h-12 bg-teal-600 px-4 text-white'>
      <p>Welcome {user?.name || "Guest"}</p>
      <button>Logout</button>
    </div>
  );
};

export default Navbar;
