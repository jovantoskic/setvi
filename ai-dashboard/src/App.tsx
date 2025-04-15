import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ReportEditor from './pages/Editor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new" element={<ReportEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
