import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';

const Adminsidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 w-64 p-6 space-y-6">
      <div className='bg-teal-600 h-12 flex items-center justify-center'>
        <h2 className="text-2xl text-center font-pacific ">Admin Panel</h2>
      </div>
<div className='px-4'>
<NavLink
  to="/admin-dashboard"
  end
  className={({ isActive }) =>
    `block py-2 px-4 rounded flex items-center ${
      isActive ? "bg-teal-500" : ""
    }`
  }
>
  Dashboard
</NavLink>

<NavLink
  to="/admin-dashboard/agent"
  className={({ isActive }) =>
    `block py-2 px-4 rounded flex items-center ${
      isActive ? "bg-teal-500" : ""
    }`
  }
>
  <FaUsers />
  <span className="ml-2">Agents</span>
</NavLink>

      </div>
    </div>
  );
};

export default Adminsidebar;
