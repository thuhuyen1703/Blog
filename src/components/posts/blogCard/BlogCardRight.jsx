import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCardRight = ({ slug, image, author, date, title, description, tags }) => {
    const navigate = useNavigate();
    return (
        <>
           <div>
                    <div 
                     className="flex mb-5 border rounded-lg overflow-hidden shadow-md gap-6 max-h-48 h-44  dark:bg-[#181818] dark:text-white bg-white">
                        <img src={image} alt={title} className="max-w-5xl w-1/2 h-48 object-cover" />
                        <div className="p-4 w-1/2">
                            <p className="text-sm text-gray-500 line-clamp-1">
                                <span className="font-semibold dark:text-white">{author}</span> • {new Date(date).toLocaleDateString("en-EN")}
                            </p>
                            <h2 className="text-xl font-bold mt-2 line-clamp-1 hover:underline hover:underline-offset-2 hover:text-green-700 hover:cursor-pointer dark:hover:text-white" onClick={() => navigate(`/post/${slug}`)}>{title}</h2>
                            <p className="text-gray-600 mt-2 line-clamp-2 dark:text-[#C0C5D0] " dangerouslySetInnerHTML={{ __html: description }} />
                            <div className="mt-3 flex gap-2 ">
                                {tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded hover:cursor-pointer"
                                        onClick={() => navigate(`/post/${slug}`)}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
};

export default BlogCardRight;