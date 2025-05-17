// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const List = () => {
//   const [agents, setAgents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAgents = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/agents');
//         setAgents(response.data.agents);
//       } catch (err) {
//         setError('Failed to load agents');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAgents();
//   }, []);

//   // Delete agent handler
//   const handleDelete = async (agentId) => {
//     if (!window.confirm('Are you sure you want to delete this agent?')) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/agents/${agentId}`);
//       setAgents(prevAgents => prevAgents.filter(agent => agent._id !== agentId));
//     } catch (err) {
//       console.error('Delete error:', err.response || err.message || err);
//       alert('Failed to delete agent: ' + (err.response?.data?.message || err.message));
//     }
//   };

//   if (loading) return <p>Loading agents...</p>;
//   if (error) return <p className="text-red-600">{error}</p>;

//   return (
//     <div className="max-w-4xl mx-auto mt-10">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Agents List</h2>
//         <Link
//           to="/admin-dashboard/add-agent"
//           className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded"
//         >
//           Add Agent
//         </Link>
//       </div>

//       <table className="min-w-full border border-gray-300 rounded-md">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-4 py-2 border-b">Name</th>
//             <th className="px-4 py-2 border-b">Email</th>
//             <th className="px-4 py-2 border-b">Phone</th>
//             <th className="px-4 py-2 border-b">Role</th>
//             <th className="px-4 py-2 border-b">Actions</th> {/* New column */}
//           </tr>
//         </thead>
//         <tbody>
//           {agents.length === 0 ? (
//             <tr>
//               <td colSpan="5" className="text-center py-4">
//                 No agents found
//               </td>
//             </tr>
//           ) : (
//             agents.map(agent => (
//               <tr key={agent._id} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border-b">{agent.name}</td>
//                 <td className="px-4 py-2 border-b">{agent.email}</td>
//                 <td className="px-4 py-2 border-b">{agent.pNo}</td>
//                 <td className="px-4 py-2 border-b">{agent.role}</td>
//                 <td className="px-4 py-2 border-b space-x-2">
//                   <button
//                     onClick={() => handleDelete(agent._id)}
//                     className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                   >
//                     Delete
//                   </button>
                 
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default List;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/agents');
        setAgents(response.data.agents);
      } catch (err) {
        setError('Failed to load agents');
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const handleDelete = async (agentId) => {
    if (!window.confirm('Are you sure you want to delete this agent?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/agents/${agentId}`);
      setAgents((prev) => prev.filter((agent) => agent._id !== agentId));
    } catch (err) {
      alert('Failed to delete agent: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <p>Loading agents...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Agents List</h2>
        <Link
          to="/admin-dashboard/add-agent"
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded"
        >
          Add Agent
        </Link>
      </div>

      <table className="min-w-full border border-gray-300 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Phone</th>
            <th className="px-4 py-2 border-b">Role</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No agents found
              </td>
            </tr>
          ) : (
            agents.map((agent) => (
              <tr key={agent._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{agent.name}</td>
                <td className="px-4 py-2 border-b">{agent.email}</td>
                <td className="px-4 py-2 border-b">{agent.pNo}</td>
                <td className="px-4 py-2 border-b">{agent.role || 'agent'}</td>
                <td className="px-4 py-2 border-b space-x-2">
                  <button
                    onClick={() => handleDelete(agent._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AgentList;
