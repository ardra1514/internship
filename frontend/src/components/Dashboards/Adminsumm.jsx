import { useNavigate } from 'react-router-dom';
import { FaUpload, FaListAlt } from 'react-icons/fa';

const Adminsumm = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-10">Admin Dashboard</h1>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <button
            onClick={() => navigate('/admin-dashboard/upload-distribute')}
            className="flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-xl text-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
          >
            <FaUpload className="text-xl" />
            Upload & Distribute
          </button>

          <button
  onClick={() => navigate('/admin-dashboard/distributed-lists')} // <-- updated
  className="ml-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
>
  View Distributed Lists
</button>

        </div>
      </div>
    </div>
  );
};

export default Adminsumm;
