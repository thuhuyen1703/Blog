import React, { useState, useEffect } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { fetchPosts } from "../../../api/BlogList";
import BlogGrid from "../blogCard/BlogGrid";

const ProjectList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      console.log("data:", data);
      setBlogs(data);
      setLoading(false);
    };
    getPosts();
  }, []);
  // pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const nextPage = () => {
    if (currentPage < Math.ceil(blogs.length / blogsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  if (loading) {
    return <div className="flex justify-center items-center min-h-screen dark:bg-[#222223]">
      <ArrowPathIcon className="h-8 w-8 text-blue-500 animate-spin" />
      <p className="ml-2 text-black dark:text-white ">Loading posts...</p>
    </div>;
  }

  if (!blogs || blogs.length === 0) {
    return <p className="text-black dark:text-white">No blog posts available.</p>;
  }

  // Chọn hai bài ngẫu nhiên, không trùng
  let randomIndex1 = Math.floor(Math.random() * blogs.length);
  let randomIndex2;
  do {
    randomIndex2 = Math.floor(Math.random() * blogs.length);
  } while (randomIndex2 === randomIndex1);


  return (
    <>
      <div className="bg-[#f8f9f9]">
        <div className=" dark:bg-[#222223] text-black dark:text-white bg-[#f8f9f9]">
          <main className="text-center pt-3 pb-4 font-inner">
            <h1 className="text-9xl font-bold">PROJECTS</h1>
          </main>
          <hr className="max-w-7xl mx-auto underline mt-7 border-gray-300 dark:border-white-500 m-auto" />
        </div>
        <div className="dark:bg-[#222223]">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-7xl  mx-auto py-5 dark:bg-[#222223] dark:text-white bg-[#f8f9f9]">
              <h1 className="text-2xl font-bold mb-6">List projects</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {currentBlogs.map((blog, index) => (
                  <BlogGrid key={index} {...blog} />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600 pb-5">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md transition duration-300 flex items-center gap-1 
            ${currentPage === 1 ? "text-gray-400 cursor-not-allowed " : "hover:text-green-600 dark:text-white dark:hover:text-green-600 "}`}
              >
                ← Previous
              </button>

              {Array.from({ length: Math.ceil(blogs.length / blogsPerPage) }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 rounded-md text-sm font-semibold transition-all duration-300 
                ${currentPage === index + 1 ? "bg-green-100 text-green-600 font-bold" : "hover:bg-gray-100 text-gray-700"}`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={nextPage}
                disabled={currentPage === Math.ceil(blogs.length / blogsPerPage)}
                className={`px-3 py-1 rounded-md transition duration-300 flex items-center gap-1 
            ${currentPage === Math.ceil(blogs.length / blogsPerPage) ? "text-gray-400 cursor-not-allowed " : "hover:text-green-600 dark:text-white dark:hover:text-green-600  "}`}
              >
                Next →
              </button>
            </div>
          </div >
        </div>
      </div>


    </>
  );
};

export default ProjectList;
