export const getPosts = async () => {
    const response = await fetch("http://localhost:8088/posts");
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return response.json(); // Assumes the response is in JSON format
  };
  
  // Function to fetch topics
  export const getTopics = async () => {
    const response = await fetch("http://localhost:8088/topics");
    if (!response.ok) {
      throw new Error("Failed to fetch topics");
    }
    return response.json(); // Assumes the response is in JSON format
  };
  
  // Function to fetch likes
  export const getLikes = async () => {
    const response = await fetch("http://localhost:8088/likes");
    if (!response.ok) {
      throw new Error("Failed to fetch likes");
    }
    return response.json(); // Assumes the response is in JSON format
  };
  
  // getServices.jsx
export const getUsers = async () => {
    const response = await fetch("http://localhost:8088/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json(); // Assumes the response is in JSON format
  };
  