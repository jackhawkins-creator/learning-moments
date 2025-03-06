import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTopics } from "../services/getServices"; // Import getTopics function to fetch available topics
import { createPost } from "../services/getServices";

export const NewPostPage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topicId, setTopicId] = useState(""); // Default topic is empty
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch topics when the component mounts
    getTopics().then((topicsData) => {
      setTopics(topicsData);
    });
  }, []);

  const handleSavePost = (e) => {
    e.preventDefault();

    const newPost = {
      title,
      body,
      topicId: parseInt(topicId),
      userId: JSON.parse(localStorage.getItem("learning_user")).id, // Get the current user ID
      date: new Date().toISOString(),
    };

    createPost(newPost)
      .then(() => {
        navigate("/myPosts"); // Redirect to home page after saving the post
      })
      .catch((error) => {
        console.error("Error saving the post:", error);
      });
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSavePost}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="topic">Topic:</label>
          <select
            id="topic"
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
            required
          >
            <option value="">Select a topic</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Save Post</button>
      </form>
    </div>
  );
};
