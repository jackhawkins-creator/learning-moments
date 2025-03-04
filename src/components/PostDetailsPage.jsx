// PostDetailsPage.jsx
import { useState, useEffect } from "react";
import { getUsers, getLikes } from "../services/getServices"; // Assuming you have these services

export const PostDetailsPage = ({ post }) => {
  const { title, body, date, topicId, userId, id: postId } = post;
  const [authorName, setAuthorName] = useState("");
  const [likeCount, setLikeCount] = useState(0); // State for the like count

  // Fetch the user's name using the userId
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const users = await getUsers();
        const author = users.find((user) => user.id === userId);
        setAuthorName(author ? author.name : "Unknown Author");
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };
    fetchUser();
  }, [userId]);

  // Fetch the likes for the post and count them
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likes = await getLikes();
        const postLikes = likes.filter((like) => like.postId === postId);
        setLikeCount(postLikes.length); // Set the like count
      } catch (error) {
        console.error("Error fetching likes: ", error);
      }
    };
    fetchLikes();
  }, [postId]);

  const getTopicName = (topicId) => {
    const topics = [
      { id: 1, name: "Technology" },
      { id: 2, name: "Health" },
      { id: 3, name: "Education" },
      { id: 4, name: "Business" },
      { id: 5, name: "Science" },
      { id: 6, name: "Art" },
      { id: 7, name: "Environment" },
    ];
    const topic = topics.find((t) => t.id === topicId);
    return topic ? topic.name : "Unknown Topic";
  };

  return (
    <div>
      <h1>{title}</h1>
      <p><strong>Author:</strong> {authorName}</p>
      <p><strong>Topic:</strong> {getTopicName(topicId)}</p>
      <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
      <p><strong>Body:</strong></p>
      <p>{body}</p>
      <p><strong>Likes:</strong> {likeCount}</p> {/* Display the like count */}
    </div>
  );
};
