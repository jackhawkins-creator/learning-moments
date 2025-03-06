import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts, deletePost } from "../services/getServices";

export const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("learning_user"));

  useEffect(() => {
    // Fetch posts authored by the current user
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts();
        const userPosts = postsData.filter((post) => post.userId === currentUser.id);
        setPosts(userPosts);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, [currentUser.id]);

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);  // Call deletePost function
      setPosts(posts.filter((post) => post.id !== postId));  // Update the state after deletion
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  return (
    <div>
      <h1>My Posts</h1>
      {posts.length === 0 ? (
        <p>No posts to display</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>
                <button
                  onClick={() => navigate(`/posts/${post.id}`)}  // Navigate to the post details page
                >
                  {post.title}
                </button>
              </h3>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
