// import React, { useState } from 'react'
// import { useAuth } from '../context/authContext'
// import { useNavigate } from 'react-router'
// import Adminsidebar from '../components/Dashboards/Adminsidebar'

// const AdminDashbord = () => {
//   const{user,loading}=useAuth()
//   const navigate=useNavigate()
//   if(loading)
//   {
//     return <div>loading........</div>
//   }
// if(!user){
//   navigate('/login')
// }

//   return (
//     <div>
//       <Adminsidebar/>
//     </div>
//   )
// }

// export default AdminDashbord


import React, { useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { Outlet, useNavigate } from 'react-router';
import Adminsidebar from '../components/Dashboards/Adminsidebar';
import Navbar from '../components/Navbar.jsx';

const AdminDashbord = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className='flex'>
      <Adminsidebar />
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar/>
      <Outlet/>
      </div>
    </div>
  );
};

export default AdminDashbord;
