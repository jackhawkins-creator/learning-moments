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

// getServices.jsx
export const getUsers = async () => {
  const response = await fetch("http://localhost:8088/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json(); // Assumes the response is in JSON format
};

// Function to create a like
export const createLike = async (like) => {
  const response = await fetch("http://localhost:8088/likes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(like),
  });

  if (!response.ok) {
    throw new Error("Failed to create like");
  }

  return response.json(); // Assumes the response is in JSON format
};

// Fetch posts by id
export const getPostById = async (postId) => {
  const response = await fetch(`http://localhost:8088/posts/${postId}?_expand=user&_expand=topic`);
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  return response.json(); // Now the response will include the user (author) and topic details.
};


// Fetch likes
export const getLikes = async () => {
  const response = await fetch("http://localhost:8088/likes");
  if (!response.ok) {
    throw new Error("Failed to fetch likes");
  }
  return response.json(); // Assumes the response is in JSON format
};

export const createPost = (newPost) => {
  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  }).then((res) => res.json());
};

export const deletePost = async (postId) => {
  const response = await fetch(`http://localhost:8088/posts/${postId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }

  return response.json();  // Optionally return data after deletion, if needed
};
