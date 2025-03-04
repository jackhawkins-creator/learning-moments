import { useState } from "react";
import { HomePage } from './components/HomePage';
import { PostDetailsPage } from './components/PostDetailsPage';

export const App = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post); // Set the clicked post as the selected post
  };

  return (
    <div>
      {selectedPost ? (
        <PostDetailsPage post={selectedPost} />
      ) : (
        <HomePage onPostClick={handlePostClick} />
      )}
    </div>
  );
};