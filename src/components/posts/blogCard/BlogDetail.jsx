import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchPostBySlug from "../../../api/GetPostBySlug";
import BlogCardRight from "./BlogCardRight";
import { fetchPosts } from "../../../api/BlogList";
import { fetchCommentsById } from "../../../api/GetComment";
import { ArrowPathIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import "./Blog.css";

const BlogDetail = () => {
    const { slug } = useParams();
    const { post, postLoading, postError } = useFetchPostBySlug(slug);
    const [blogs, setBlogs] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);

    // const [newComment, setNewComment] = useState("");

    // const handleAddComment = () => {
    //     if (newComment.trim() === "") return;
    //     const newCommentData = {
    //         id: comments.length + 1,
    //         name: "Guest", // Hoặc lấy từ hệ thống đăng nhập nếu có
    //         text: newComment
    //     };
    //     setComments([...comments, newCommentData]);
    //     setNewComment(""); // Reset ô nhập
    // };


    useEffect(() => {
        const getPosts = async () => {
            const data = await fetchPosts();
            setBlogs(data);
        };
        getPosts();
    }, []);
    const [showGoToTop, setShowGoToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 200) {
                setShowGoToTop(true)
            } else {
                setShowGoToTop(false)
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    useEffect(() => {
        if (post && post.id) {
            console.log("PostId:", post.id);
            console.log("post:", post);
            const getComments = async () => {
                setCommentsLoading(true);
                const commentData = await fetchCommentsById(post.id);
                console.log("Fetched comments:", commentData);
                setComments(commentData);
                setCommentsLoading(false);
            };
            getComments();
        }
    }, [post]);

    if (postLoading || commentsLoading) return <div className="flex justify-center items-center min-h-screen dark:bg-[#222223]">
        <ArrowPathIcon className="h-8 w-8 text-blue-500 animate-spin" />
        <p className="ml-2 text-black dark:text-white dark:bg-[#090D1F]">Loading posts...</p>
    </div>;
    if (postError) return <p>Error: {postError}</p>;
    if (!post) return <p>Post not found</p>;


    return (
        <div className="dark:bg-[#090D1F] px-20 bg-[#f8f9f9]">
            <div className="max-w-full mx-auto  py-10 dark:bg-[#090D1F] dark:text-white">
                <div className="flex gap-6">
                    <div className="w-2/3">
                        <div className="max-w-4xl mx-auto border bg-white dark:bg-gray-900 shadow-md rounded-lg">
                            <div className="mx-6">
                                <h2 className="text-4xl font-bold mt-6">{post.title}</h2>
                                <p className="text-sm text-gray-500 mt-4">
                                    <span className="font-bold text-black">{post.author}</span> • {post.date}
                                </p>
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover mt-5 " />
                                <div className="p-4">
                                    <div className="text-gray-900 mt-2 dark:text-[#C0C5D0]"
                                        dangerouslySetInnerHTML={{ __html: post.description }}
                                    />
                                </div>
                            </div>
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold mb-3 dark:text-white">Comments</h2>
                                <div className="space-y-6 max-h-80 overflow-y-auto  ">
                                    {comments.map((comment) => (
                                        <div key={comment.id} className="flex items-start space-x-4 p-4 border-b border-gray-300 dark:border-gray-600">
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author)}&background=random`}
                                                alt={comment.author}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <p className="font-semibold text-gray-900 dark:text-white">{comment.author}</p>
                                                </div>
                                                <p className="text-sm text-gray-500">{comment.date}</p>
                                                <p className="text-gray-800 dark:text-gray-300 mt-1">{comment.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>


                        {/* <div className="mt-6">
                            <textarea
                                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                                rows="3"
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button
                                onClick={handleAddComment}
                                className="mt-3 px-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition"
                            >
                                Post Comment
                            </button>
                        </div> */}

                    </div>
                    <div className="w-1/3">
                        {blogs
                            .filter((blog) => blog.id !== post.id)
                            .slice(0, 5)
                            .map((blog, index) => (
                                <BlogCardRight key={index} {...blog} />
                            ))}
                    </div>
                </div>
            </div>
            <div>
                <ul>

                    {showGoToTop && (
                        <button
                            onClick={scrollToTop}
                            className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition duration-300"
                        >
                            <ArrowUpIcon className="h-6 w-6" />
                        </button>
                    )}
                </ul>
            </div>
        </div>

    );
};

export default BlogDetail;
