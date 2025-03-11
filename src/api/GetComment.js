export const fetchCommentsById = async (id) => {

    try {
      const response = await fetch(`https://becodechallenge.codebaseperfect.site/api/comment/get-all-comment-blog/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Fetched comments:", data); 
      console.log("commentId:", data.data.data);
  
      return data.data.data.map((comment) => ({
        id: comment._id,
        author: comment.user_name,
        content: comment.content,
        date: comment.createdAt,
        avatar: comment.user_image,
        date: comment.createdAt 
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  };
  