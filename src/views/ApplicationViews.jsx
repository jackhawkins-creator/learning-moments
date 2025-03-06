import { Outlet, Route, Routes } from "react-router-dom";
import { HomePage } from "../components/HomePage";
import { useEffect, useState } from "react";
import { NavBar } from "../components/nav/NavBar";
import { PostDetails } from "../components/PostDetails";
// import { FavoritesPage } from "../components/FavoritesPage";
import { NewPostPage } from "../components/NewPostPage";
import { MyPostsPage } from "../components/MyPostsPage";
// import { ProfilePage } from "../components/ProfilePage";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localLearningUser = localStorage.getItem("learning_user");
    const learningUserObject = JSON.parse(localLearningUser);

    setCurrentUser(learningUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<HomePage currentUser={currentUser} />} />
        <Route
          path="/posts/:postId"
          element={<PostDetails currentUser={currentUser} />}
        />
        <Route path="/myPosts" element={<MyPostsPage />} />
        <Route path="/newPost" element={<NewPostPage />} />
      </Route>
    </Routes>
  );
};
