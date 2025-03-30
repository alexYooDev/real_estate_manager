import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CreateProperty from './pages/CreateProperty';
import PropertiesFeed from './pages/PropertiesFeed';
import PropertyDetail from './pages/PropertyDetail';
import Main from './pages/Main';
import UpdateProperty from './pages/UpdateProperty';
import MyPropertyPosts from './pages/MyPropertyPosts';
import Footer from './components/Footer';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import MySavedPosts from './pages/MySavedPosts';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/view-property' element={<PropertiesFeed />} />
        <Route path='/view-detail' element={<PropertyDetail />} />
        <Route path='/create-property' element={<CreateProperty />} />
        <Route path='/update-property' element={<UpdateProperty />} />
        <Route path='/my-post' element={<MyPropertyPosts />} />
        <Route path='/saved-post' element={<MySavedPosts />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
