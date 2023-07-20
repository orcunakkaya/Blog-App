import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import Blog from './pages/Blog';
import AddBlog from './pages/AddBlog';
import BlogDetail from './pages/BlogDetail';
import UpdateBlog from './pages/UpdateBlog';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Blog />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path='/blog/:id' element={<BlogDetail />} />
        <Route path='/update-blog/:id' element={<UpdateBlog />} />
      </Routes>
    </div>
  );
}

export default App;
