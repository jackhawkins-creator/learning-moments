import { useState, useEffect } from "react";
import { getPosts, getTopics, getLikes } from "../services/getServices";
import { Link } from "react-router-dom";

export const HomePage = ({ onPostClick }) => {
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [likes, setLikes] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await getPosts();
        const topicsData = await getTopics();
        const likesData = await getLikes();
        setPosts(postsData);
        setTopics(topicsData);
        setLikes(likesData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getTopicName = (topicId) => {
    const topic = topics.find((t) => t.id === topicId);
    return topic ? topic.name : "Unknown Topic";
  };

  const getLikeCount = (postId) => {
    return likes.filter((like) => like.postId === postId).length;
  };

  const filteredPosts = posts.filter((post) => {
    const matchesTopic =
      selectedTopic === "all" || post.topicId === parseInt(selectedTopic);
    const matchesSearchTerm = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesTopic && matchesSearchTerm;
  });

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <label htmlFor="topicSelect">Filter by Topic:</label>
        <select
          id="topicSelect"
          value={selectedTopic}
          onChange={handleTopicChange}
        >
          <option value="all">All Topics</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="searchInput">Search by Title:</label>
        <input
          type="text"
          id="searchInput"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter search term..."
        />
      </div>

      <div>
        <h2>Posts</h2>
        {filteredPosts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          <ul>
            {filteredPosts.map((post) => (
              <li key={post.id}>
                <h3>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>{" "}
                  {/* Make title clickable */}
                </h3>
                <p>Topic: {getTopicName(post.topicId)}</p>
                <p>Likes: {getLikeCount(post.id)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
