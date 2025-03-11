import { useState, useEffect } from "react";

const useFetchPostBySlug = (slug) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(
                    `https://becodechallenge.codebaseperfect.site/api/blog/${slug}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched post:", data);
                if (data?.data) {
                    setPost({
                        id: data.data._id,
                        image: "https://becodechallenge.codebaseperfect.site/uploads/images/" + data.data.image ||"https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp",
                        author: data.data.user_name,
                        date: data.data.createdAt,
                        title: data.data.title,
                        description: data.data.content,
                        tags: data.data.tags,
                    });
                } else {
                    setError("Post not found");
                }
            } catch (error) {
                console.error("Error fetching post by slug:", error);
                setError("Post not found");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    return { post, loading, error };
};

export default useFetchPostBySlug;
