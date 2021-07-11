import React from "react";
import { getAllPosts } from "../slices/posts/thunks";
import { useDispatch, useSelector } from "react-redux";
import postsSelectors from "../slices/posts/selectors";

const usePostsHandler = () => {
  const dispatch = useDispatch();
  const posts = useSelector(postsSelectors.selectAll);

  React.useEffect(() => {
    if (posts.length < 1) {
      dispatch(getAllPosts());
    }
  }, [dispatch, posts.length]);
};

export default usePostsHandler;
