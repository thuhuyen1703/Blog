import './App.css';
import HomePage from './components/pages/HomePages';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import BlogDetail from './components/posts/blogCard/BlogDetail';
import ProjectList from './components/posts/project/ProjectList';
function App() {
  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="/post/:slug" element={<BlogDetail />} />
            <Route path='/project' element={<ProjectList />} />
          </Routes>
        </main>
        <Footer />
      </div>

    </>

  );
}

export default App;
