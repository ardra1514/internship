import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashbord from './pages/AdminDashbord';
import Employdash from './pages/Employdash';
import './App.css';

import Adminsumm from './components/Dashboards/Adminsumm';
import List from './components/Agents/List';
import AddAgent from './components/Agents/AddAgent';
import UploadDistribute from './pages/UploadDistribute';
import DistributedLists from './pages/DistributedLists';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/admin-dashboard" />} />
        <Route path='/login' element={<Login />} />
        
        {/* Admin Dashboard with Nested Routes */}
        <Route path='/admin-dashboard' element={<AdminDashbord />}>
          <Route index element={<Adminsumm />} />
          <Route path="agent" element={<List />} />
          <Route path="add-agent" element={<AddAgent />} />
          <Route path="upload-distribute" element={<UploadDistribute />} />
          <Route path="distributed-lists" element={<DistributedLists/>} />
        </Route>

        <Route path='/agent-dash' element={<Employdash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
