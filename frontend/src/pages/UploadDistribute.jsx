import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadDistribute = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a CSV file');
      return;
    }
    setError('');
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload-csv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(res.data.message);
    } catch (err) {
      setError('Upload failed. Make sure backend is running and CSV format is correct.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload CSV & Distribute Tasks</h2>
      <form onSubmit={onSubmit}>
        <input type="file" accept=".csv" onChange={onFileChange} className="mb-4" />
        <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded">
          Upload & Distribute
        </button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {/* Navigation button */}
      <button
        onClick={() => navigate('/admin-dashboard/distributed-lists')}
        className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        View Distributed Lists
      </button>
    </div>
  );
};

export default UploadDistribute;
