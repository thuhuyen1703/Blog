import React from "react";
import { useNavigate } from "react-router-dom";

const BlogGrid = ({ slug, image, author, date, title, description, tags }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden  dark:bg-[#181818] dark:text-white border">
      <img src={image} alt={title} className="w-full h-48 object-cover " />
      <div className="p-4">
        <p className="text-sm text-gray-500 mt-4">
          <span className="font-semibold text-black dark:text-white">{author}</span> • {new Date(date).toLocaleDateString("en-EN")}
        </p>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 hover:text-green-500 hover:cursor-pointer dark:hover:text-white" onClick={() => navigate(`/post/${slug}`)}>{title}</h2>
        <p className="text-gray-700 text-sm mt-2 line-clamp-3 dark:text-[#C0C5D0]" dangerouslySetInnerHTML={{ __html: description }} />
        <div className="mt-3 flex flex-wrap gap-2 hover:cursor-pointer" >
          {tags.map((category, index) => (
            <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded items-center justify-between cursor-pointer"
              onClick={() => navigate(`/post/${slug}`)}
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogGrid;
