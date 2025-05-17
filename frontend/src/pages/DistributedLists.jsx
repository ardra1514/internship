
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DistributedLists = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/distributed-lists');
        setLists(res.data.lists);
      } catch (err) {
        setError('Failed to load distributed lists');
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  if (loading) return <p>Loading distributed lists...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Distributed Lists</h2>
      {lists.length === 0 ? (
        <p>No lists found</p>
      ) : (
        lists.map(({ agent, items }) => (
          <div key={agent._id} className="mb-8 border p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Agent: {agent.name}</h3>
            <table className="min-w-full border border-gray-300 rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b">FirstName</th>
                  <th className="px-4 py-2 border-b">Phone</th>
                  <th className="px-4 py-2 border-b">Notes</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4">No tasks</td>
                  </tr>
                ) : (
                  items.map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{item.FirstName}</td>
                      <td className="px-4 py-2 border-b">{item.Phone}</td>
                      <td className="px-4 py-2 border-b">{item.Notes}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default DistributedLists;
