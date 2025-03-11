export const fetchPosts = async () => {
  try {
    const response = await fetch( `https://becodechallenge.codebaseperfect.site/api/blog/get-all`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched posts:", data); 

    return data.data.data.map((post) => ({
      id: post._id,
      image: "https://becodechallenge.codebaseperfect.site/uploads/images/" + post.image ||"https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp",
      author: post.user_name || "Unknown",
      date: post.createdAt || "N/A",
      title: post.title || "No Title",
      description: post.content || "No Content",
      tags: post.tags || ["Read more"],
      slug: post.slug
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
