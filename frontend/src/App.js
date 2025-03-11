import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Properties from './pages/Properties';
import PropertiesFeed from './pages/PropertiesFeed';
import PropertyDetail from './pages/PropertyDetail';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/view-property" element={<PropertiesFeed/>} />
        <Route path="/view-detail" element={<PropertyDetail/>}/>
        <Route path="/create-property" element={<Properties />} />
      </Routes>
    </Router>
  );
}

export default App;
