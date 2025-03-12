import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ slug, image, author, date, title, description, tags }) => {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <div
                    className="card border rounded-lg overflow-x-hidden shadow-md  mb-6  dark:bg-[#181818]">
                    <img src={image} alt={title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <p className="text-sm text-gray-500 ">
                            <span className="font-semibold dark:text-white">{author}</span> • {new Date(date).toLocaleDateString("en-EN")}
                        </p>
                        <h2 className="text-xl font-bold mt-2 line-clamp-1  hover:text-green-700 hover:cursor-pointer dark:hover:text-white " onClick={() => navigate(`/post/${slug}`)}>{title}</h2>
                        <div className="text-gray-600 mt-2 dark:text-[#C0C5D0] line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                        <div className="mt-3 flex gap-2 " >
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded items-center justify-between cursor-pointer"
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

export default BlogCard;
