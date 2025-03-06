import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById, getLikes, createLike } from "../services/getServices";

export const PostDetails = ({ currentUser }) => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);  // Track if the post is liked by the user
  const [isAuthor, setIsAuthor] = useState(false);  // Track if the current user is the author

  // Fetch the post and likes data
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postData = await getPostById(postId);
        const likesData = await getLikes();
        setPost(postData);

        // Check if the current user is the author of the post
        setIsAuthor(postData.userId === currentUser.id);

        // Check if the current user has already liked the post
        const userLikes = likesData.filter((like) => like.userId === currentUser.id && like.postId === parseInt(postId));
        setIsLiked(userLikes.length > 0);

        setLikes(likesData);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [postId, currentUser.id]);

  // Handle like button click
  const handleLikeClick = async () => {
    if (isLiked || isAuthor) return; // Prevent liking if already liked or if the user is the author

    try {
      // POST the like
      const newLike = {
        userId: currentUser.id,
        postId: parseInt(postId),  // Ensure postId is an integer
      };

      await createLike(newLike);

      // Update the UI
      setIsLiked(true);

      // Fetch the updated likes
      const updatedLikes = await getLikes();
      setLikes(updatedLikes);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  if (!post) {
    return <div>Loading post details...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>Author: {post.user.name}</p>
      <p>Topic: {post.topic.name}</p>
      <p>Date: {post.date}</p>
      <p>{post.body}</p>

      <div>
        <button onClick={handleLikeClick} disabled={isLiked || isAuthor}>
          {isLiked ? "You liked this post" : isAuthor ? "You can't like your own post" : "Like this post"}
        </button>
        <p>{likes.filter((like) => like.postId === parseInt(postId)).length} Likes</p>
      </div>

      {/* If the current user is the author of the post, show an edit button */}
      {post.userId === currentUser.id && (
        <button>Edit Post</button>
      )}
    </div>
  );
};
